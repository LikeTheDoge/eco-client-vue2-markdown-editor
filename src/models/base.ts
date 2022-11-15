import { eModel, eKey, eJson, eType } from 'e-model'
import { getAvatarUrl } from 'e-user'


/**
 * Format bytes as human-readable text.
 * 
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use 
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 * 
 * @return Formatted string.
 */
function humanFileSize(bytes: number, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }

    const units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


    return bytes.toFixed(dp) + ' ' + units[u];
}

@eModel('ProjectInfo')
export class ProjectInfo {
    @eKey
    @eType('string')
    @eJson('id')
    projectId = ''

    @eType('string')
    @eJson('projectName')
    title = ''

    @eType('string')
    @eJson('desc')
    desc = ''

    @eType('string')
    @eJson('location')
    location = ''
}

@eModel('FolderInfo')
export class FolderInfo {
    @eKey
    @eType('string')
    @eJson('id')
    folderId = ''


    @eType('string')
    @eJson('name')
    name = ''

    @eType('string')
    @eJson('remark')
    remark = ''


    @eType('string')
    @eJson('path')
    path = ''

    @eType('string')
    @eJson('name')
    location = ''

    @eType('string')
    @eJson('projectId')
    projectId = ''

    @eType('string')
    @eJson(
        (m, j) => { m.parentId = j.parentId === "0" ? '' : j.parentId },
        (m, j) => { j.parentId = m.parentId ? "0" : m.parentId }
    )
    parentId = ''


    // 是否有子目录
    @eType('boolean')
    @eJson('hasSubDir')
    existChildrenFolder = false

    // 是否有共享文件
    @eType('boolean') @eJson(
        (m, j) => { m.hasSharedFile = !!j.hasSharedFile }
    )
    hasSharedFile = false

    @eType('datetime')
    @eJson('updateTime')
    contentUpdateTime = new Date()

    @eType('datetime')
    @eJson('updateTime')
    updateTime = new Date()

    @eType('datetime')
    @eJson('createTime')
    createTime = new Date()
}

@eModel('FileInfo')
export class FileInfo {
    // static type(file: FileInfo) {
    //     const ext = (file.ext || '').toLocaleLowerCase()
    //     const types = {
    //         'image': ['jpg', 'png', 'gif', 'webp'],
    //         'excel': ['xls'],
    //         'word': ['doc'],
    //         'ppt': ['ppt'],
    //         'music': ['mp3'],
    //         'code': ['js', 'ts', 'vue', 'css'],
    //         'link': ['html'],
    //         'zip': ['zip', 'rar', '7z'],
    //         'gif': ['gif'],
    //         'exe': ['exe'],
    //         'pdf': ['pdf'],
    //         'txt': ['txt'],
    //     }

    //     const type = Array.from(Object.entries(types))
    //         .find(([_, list]) => {
    //             return !!list.find(e => ext.indexOf(e) === 0)
    //         })

    //     return type ? type[0] : 'unknown'
    // }

    @eKey
    @eType('string')
    @eJson('id')
    fileId = ''

    @eType('string')
    @eJson('remark')
    remark = ''

    @eType('string')
    @eJson('fileId')
    uploadFileId = ''

    @eType('string')
    @eJson('name')
    name = ''

    @eType('string')
    @eJson((m, j) => {
        const list = (j.name || '').split('.')
        if (list.length < 2) m.ext = ''
        else m.ext = list[list.length - 1]
    })
    ext = ''

    @eType('string')
    @eJson((m, j) => {
        m.projectLoc = j.project?j.project.location : ''
    })
    projectLoc = ''


    @eType('string')
    @eJson('projectId')
    projectId = ''

    @eType('string')
    @eJson((m, j) => {
        m.folderId = j.folderId || j.parentId
        m.folderId = m.folderId === '0' ? null : m.folderId
    })
    folderId = ''


    @eType('string')
    @eJson('path')
    path = ''

    @eType('string')
    @eJson('location')
    location = ''

    @eType('datetime')
    @eJson('updateTime')
    contentUpdateTime = new Date()

    @eType('datetime')
    @eJson('updateTime')
    updateTime= new Date()

    @eType('datetime')
    @eJson('createTime')
    createTime= new Date()


    @eType('string')
    @eJson((m, j) => {
        const num_size = j.platFile ? j.platFile.size : 0
        const str_size = humanFileSize(num_size, true, 2)
        m.fileSize = str_size
    })
    fileSize = ''

    @eType('boolean')
    @eJson((m, j) => {
        m.isShared = !!j.isSharedFile
    })
    isShared = false

    @eType('string')
    @eJson((m, j) => {
        m.downloadUrl = j.platFile ? j.platFile.downLoadUrl : ''
    })
    downloadUrl = ''

    @eType('string')
    sharedUrl = ''
}

@eModel('Record')
export class Record {

    @eKey
    @eType('string')
    @eJson('id')
    recordId = ''

    @eType('string')
    @eJson('targetId')
    targetId = ''


    @eType('datetime')
    @eJson('createTime')
    createTime = ''

    @eType('string')
    @eJson((m, j) => {
        m.createUserName = j.sysUser ?
            j.sysUser.nickname :
            '(暂无)'
    })
    createUserName = ''

    @eType('string')
    @eJson((m, j) => {
        m.createUserAvatar = j.sysUser ?
            getAvatarUrl(j.sysUser.avatar) :
            ''
    })
    createUserAvatar = ''


    @eType('string')
    @eJson('content')
    content = ''

}