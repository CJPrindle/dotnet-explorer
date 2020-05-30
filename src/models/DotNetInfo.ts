import { Url } from "url"

export class DotNetInfo {
    SDKVersion: string
    SDKCommit: string
    OSName: string
    OSVersion: string
    OSPlatform: string
    RID: string
    BasePath: string
    HostingPackageVersion: string
    SDKs: string[][]
    Runtimes: string[][][]
    DownloadsURL: Url
}