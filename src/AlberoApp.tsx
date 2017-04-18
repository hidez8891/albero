import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import * as reducers from './reducers';
import ListView from './ListView';
import ImageView from './ImageView';

interface AlberoAppPropValues extends React.Props<AlberoApp> {
}

interface AlberoAppPropFunctions extends React.Props<AlberoApp> {
    openPath: (string) => any
}

interface AlberoAppProps extends AlberoAppPropValues, AlberoAppPropFunctions {
}

class AlberoApp extends React.Component<AlberoAppProps, undefined> {
    componentDidMount() {
        document.addEventListener("dragover", this._eventStopper.bind(this));
        document.addEventListener("dragleave", this._eventStopper.bind(this));
        document.addEventListener("drop", this._getDropFilePath.bind(this));
    }

    _eventStopper(e: MouseEvent): boolean {
        e.preventDefault();
        return false;
    }

    _getDropFilePath(e: DragEvent): boolean {
        let files = e.dataTransfer.files;
        if (files.length > 0) {
            let path = e.dataTransfer.files.item(0).path;
            this.props.openPath(path);
        }

        e.preventDefault();
        return false;
    }

    render(): JSX.Element {
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
}

function mapStateToProps(state: reducers.ActionState): AlberoAppPropValues {
    return {};
}

function mapDispatchToProps(dispatch): AlberoAppPropFunctions {
    return {
        openPath: bindActionCreators(actions.openPath, dispatch),
    };
}

const ConnectedAlbeoApp = connect(mapStateToProps, mapDispatchToProps)(AlberoApp);
export default ConnectedAlbeoApp;
