import { AlberoServer } from '../library/AlberoServer'
import * as ospath from 'path';

export const SELECT_PATH = 'SELECT_PATH';
export const SELECT_NEXT_FILE = 'SELECT_NEXT_FILE';
export const SELECT_PREVIOUS_FILE = 'SELECT_PREVIOUS_FILE';
export const UPDATE_FILES = 'UPDATE_FILES';

const alberofs = new AlberoServer();
alberofs.run();

export interface ActionHash {
    type: string,
    path?: string
    filemap?: Map<string, string[]>
}

const selectPath = (path: string): ActionHash => ({
    type: SELECT_PATH,
    path: path
});

const updateFiles = (filemap: Map<string, string[]>): ActionHash => ({
    type: UPDATE_FILES,
    filemap: filemap
});

export const selectNextFile = (): ActionHash => ({
    type: SELECT_NEXT_FILE
});

export const selectPreviousFile = (): ActionHash => ({
    type: SELECT_PREVIOUS_FILE
});

export const openPath = (path: string) => {
    return async (dispatch, getState) => {
        if (await alberofs.isFile(path)) {
            let dirpath = ospath.normalize(`${path}/..`)
            let filemap = await alberofs.readDir(dirpath);
            dispatch(updateFiles(filemap));
            dispatch(selectPath(path));
        } else {
            let filemap = await alberofs.readDir(path);
            dispatch(updateFiles(filemap));
            if (filemap["image"].length > 0) {
                dispatch(selectPath(filemap["image"][0]));
            }
        }
    }
}
