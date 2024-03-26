export class QuickLook {
  async init() {
    const itemsTreeElement = document.getElementById("zotero-items-tree");

    if (itemsTreeElement) {
      itemsTreeElement.addEventListener(
        "keydown",
        (event) => this.onkey(event),
        true,
      );
    } else {
      ztoolkit.log("no items tree element found");
    }
  }

  onkey = (event: KeyboardEvent) => {
    const selectedItem = ZoteroPane.getSelectedItems()[0];
    if (selectedItem) {
      // 空值检查，确保 selectedItem 不为 null
      this.handleKeyPress(event, selectedItem);
    }
  };

  async getAttachmentPath(item: Zotero.Item) {
    if (item.isAttachment() && !item.isNote()) {
      return await item.getFilePathAsync();
    } else if (item.isRegularItem() && !item.isAttachment()) {
      const attachments = await item.getAttachments();
      for (const attachmentID of attachments) {
        const attachment = await Zotero.Items.getAsync(attachmentID);
        return await attachment.getFilePathAsync();
      }
    }
    return null;
  }

  async openQuickLook(item: Zotero.Item) {
    ztoolkit.log("opening viewer");
    const filePath = await this.getAttachmentPath(item);
    if (filePath === null || filePath === undefined || filePath === false) {
      return false;
    }
    const applicationPath = "/usr/bin/qlmanage";
    const args: string[] = ["-p", filePath];
    Zotero.Utilities.Internal.exec(applicationPath, args);
  }

  handleKeyPress(event: KeyboardEvent, item: Zotero.Item) {
    // 检查按下的键是否是空格键
    if (
      event.key === " " ||
      event.key === "Spacebar" ||
      event.key === "Space"
    ) {
      // 执行你想要的操作
      this.openQuickLook(item);
    }
  }
}
