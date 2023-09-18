// @return Promise<boolean>
async function askWritePermission() {
  try {
    // The clipboard-write permission is granted automatically to pages
    // when they are the active tab. So it's not required, but it's more safe.
    const { state } = await navigator.permissions.query({
      name: "clipboard-write" as PermissionName,
    });
    return state === "granted";
  } catch (error) {
    // Browser compatibility / Security error (ONLY HTTPS) ...
    return false;
  }
}

// @params blob - The ClipboardItem takes an object with the MIME type as key, and the actual blob as the value.
// @return Promise<void>
const setToClipboard = async (blob) => {
  const data = [new ClipboardItem({ [blob.type]: blob })];
  await navigator.clipboard.write(data);
};

export const copyImageToClipboard = async (url: string) => {
  // Can we copy a text or an image ?
  const canWriteToClipboard = await askWritePermission();

  // Copy a PNG image to clipboard
  if (canWriteToClipboard) {
    const response = await fetch(url);
    const blob = await response.blob();
    await setToClipboard(blob);
  }
};

export const copyTextToClipboard = async (text: string) => {
  // Can we copy a text or an image ?
  const canWriteToClipboard = await askWritePermission();

  // Copy a text to clipboard
  if (canWriteToClipboard) {
    const blob = new Blob([text], { type: "text/plain" });
    await setToClipboard(blob);
  }
};
