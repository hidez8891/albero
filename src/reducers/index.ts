import * as paths from "path";
import { AlberoServer } from "../library/AlberoServer";

import {
    IActionHash,
    SELECT_NEXT_FILE, SELECT_PATH, SELECT_PREVIOUS_FILE, UPDATE_FILES,
} from "../actions";

export interface IActionState {
    selectedFile: string;
    dirs: string[];
    archs: string[];
    files: string[];
}

export const InitialActionState: IActionState = {
    selectedFile: "",
    dirs: [],
    archs: [],
    files: [],
};

const getNearFilePath = (state: IActionState, dx: number): string => {
    const { files, selectedFile } = state;
    if (files.length === 0) { return ""; }

    let index = files.indexOf(selectedFile);
    if (index < 0) { return ""; }

    index += dx;
    if (index >= files.length) {
        index = 0; // first index
    }
    if (index < 0) {
        index = files.length - 1; // last index
    }
    return files[index];
};

export default (state: IActionState, action: IActionHash): IActionState => {
    let { path } = action;
    const { filemap } = action;

    if (typeof path !== "undefined") {
        path = paths.normalize(path);
        path = path.replace(/\\/g, "/");
    }

    switch (action.type) {
        case SELECT_PATH:
            return Object.assign({}, state, { selectedFile: path });
        case SELECT_NEXT_FILE:
            return Object.assign({}, state, { selectedFile: getNearFilePath(state, +1) });
        case SELECT_PREVIOUS_FILE:
            return Object.assign({}, state, { selectedFile: getNearFilePath(state, -1) });
        case UPDATE_FILES:
            return Object.assign({}, state, {
                selectedFile: "",
                dirs: filemap["dir"],
                archs: filemap["archive"],
                files: filemap["image"],
            });
        default:
            return state;
    }
};
