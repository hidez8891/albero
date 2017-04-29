import * as ospath from "path";
import { AlberoServer } from "../library/AlberoServer";

export const SELECT_PATH = "SELECT_PATH";
export const SELECT_NEXT_FILE = "SELECT_NEXT_FILE";
export const SELECT_PREVIOUS_FILE = "SELECT_PREVIOUS_FILE";
export const UPDATE_FILES = "UPDATE_FILES";

const alberofs = new AlberoServer();
alberofs.run();

export interface IActionHash {
    type: string;
    path?: string;
    filemap?: Map<string, string[]>;
}

const selectPath = (path: string): IActionHash => ({
    type: SELECT_PATH,
    path,
});

const updateFiles = (filemap: Map<string, string[]>): IActionHash => ({
    type: UPDATE_FILES,
    filemap,
});

export const selectNextFile = (): IActionHash => ({
    type: SELECT_NEXT_FILE,
});

export const selectPreviousFile = (): IActionHash => ({
    type: SELECT_PREVIOUS_FILE,
});

export const openPath = (path: string) => {
    return async (dispatch, getState) => {
        if (await alberofs.isFile(path)) {
            const dirpath = ospath.normalize(`${path}/..`);
            const filemap = await alberofs.readDir(dirpath);
            dispatch(updateFiles(filemap));
            dispatch(selectPath(path));
        } else {
            const filemap = await alberofs.readDir(path);
            dispatch(updateFiles(filemap));
            if (filemap["image"].length > 0) {
                dispatch(selectPath(filemap["image"][0]));
            }
        }
    };
};
