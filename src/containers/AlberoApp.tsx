import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import * as reducers from "../reducers";
import ImageView from "./ImageView";
import ListView from "./ListView";

interface IAlberoAppPropValues extends React.Props<AlberoApp> {
}

interface IAlberoAppPropFunctions extends React.Props<AlberoApp> {
    openPath: (path: string) => any;
}

interface IAlberoAppProps extends IAlberoAppPropValues, IAlberoAppPropFunctions {
}

class AlberoApp extends React.Component<IAlberoAppProps, undefined> {
    public componentDidMount() {
        document.addEventListener("dragover", this._eventStopper.bind(this));
        document.addEventListener("dragleave", this._eventStopper.bind(this));
        document.addEventListener("drop", this._getDropFilePath.bind(this));
    }

    public render(): JSX.Element {
        return (
            <div className="window">
                <div className="window-content">
                    <div className="spliter vertical pane-group">
                        <ListView className="pane pane-sm" />
                        <ImageView className="pane" />
                    </div>
                </div>
            </div>
        );
    }

    private _eventStopper(e: MouseEvent): boolean {
        e.preventDefault();
        return false;
    }

    private _getDropFilePath(e: DragEvent): boolean {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const path = e.dataTransfer.files.item(0).path;
            this.props.openPath(path);
        }

        e.preventDefault();
        return false;
    }
}

function mapStateToProps(state: reducers.IActionState): IAlberoAppPropValues {
    return {};
}

function mapDispatchToProps(dispatch): IAlberoAppPropFunctions {
    return {
        openPath: bindActionCreators(actions.openPath, dispatch),
    };
}

const ConnectedAlbeoApp = connect(mapStateToProps, mapDispatchToProps)(AlberoApp);
export default ConnectedAlbeoApp;
