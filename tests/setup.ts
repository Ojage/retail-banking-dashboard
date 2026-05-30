import "@testing-library/jest-dom";
import "jest-axe/extend-expect";
import "whatwg-fetch";
import { TransformStream, WritableStream, ReadableStream } from "stream/web";
import { TextEncoder, TextDecoder } from "util";
import { BroadcastChannel } from "worker_threads";

Object.assign(globalThis, { TextEncoder, TextDecoder });
Object.assign(globalThis, { TransformStream, WritableStream, ReadableStream, BroadcastChannel });
