const { remarkPlugin } = require("docusaurus-plugin-glossary");

// Android and Apple docs are authored in their client repositories and synced in.
// They get glossary tooltips like any other page, but acronym expansion is off for
// them: rewriting "MQTT" to "Message Queuing Telemetry Transport (MQTT)" would edit
// wording those repos own, and the change would be invisible to the people who wrote it.
const SYNCED_CLIENT_DOCS = ["docs/software/android/", "docs/software/apple/"];

module.exports = function glossaryScope(options = {}) {
  const expanding = remarkPlugin({ ...options, expandAcronymsOnFirstUse: true });
  const verbatim = remarkPlugin({ ...options, expandAcronymsOnFirstUse: false });

  return (tree, file) => {
    const filePath = (file?.path ?? "").replace(/\\/g, "/");
    const isSynced = SYNCED_CLIENT_DOCS.some((dir) => filePath.includes(dir));
    return (isSynced ? verbatim : expanding)(tree, file);
  };
};
