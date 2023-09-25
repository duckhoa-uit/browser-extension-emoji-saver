// [IPC]: inter-process communications (background <-> options-page <-> content-pages)

export const enum MessageType {
  SHOW_EMOJI_COLLECTION = "SHOW_EMOJI_COLLECTION",
  HEHE = "HEHE",
}

export interface Message<Payload = any /*json-serializable*/> {
  type: MessageType;
  payload?: Payload;
}

export const enum ProxyResponseType {
  JSON = "json",
  TEXT = "text",
  DATA_URL = "data-url", // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
  BLOB = "binary-data",
}

export interface ProxyRequestPayload {
  url: string;
  responseType?: ProxyResponseType;
  requestInit?: ProxyRequestInit;
}

export type ProxyRequestInit = Omit<
  RequestInit,
  "window" | "signal" | "body"
> & {
  body?: string;
};

export interface ProxyResponsePayload<Data> {
  url: string;
  headers: { [header: string]: string; "content-type"?: string };
  data: Data;
}

export interface TranslateWithVendorPayload {
  vendor: string;
  text: string;
  from?: string;
  to?: string;
}

export interface ChromeTtsPayload {
  text: string;
  lang: string;
  rate?: number; // default: 1.0
}
