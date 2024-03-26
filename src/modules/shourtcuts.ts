import { config } from "../../package.json";
import { getString } from "../utils/locale";

export class KeyFactory {
  static registerShortcuts() {
    new ztoolkit.ProgressWindow(config.addonName)
      .createLine({
        text: "Shortcuts: Space",
        type: "success",
      })
      .show();
  }
}
