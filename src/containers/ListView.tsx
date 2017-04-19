import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as reducers from '../reducers';
import * as paths from 'path';

interface ListViewPropValues extends React.Props<ListView> {
    url: string;
    dirs: string[];
    archs: string[];
    files: string[];
    className?: string;
}

interface ListViewPropFunctions extends React.Props<ListView> {
    openPath: (string) => any
    selectNextFile: () => any
    selectPreviousFile: () => any
}

interface ListViewProps extends ListViewPropValues, ListViewPropFunctions {
}

class ListView extends React.Component<ListViewProps, undefined> {
    constructor(props: ListViewProps) {
        super(props);
    }

    componentDidMount() {
        document.addEventListener("keydown", this._getKeyEvent.bind(this));
    }

    _getKeyEvent(e: KeyboardEvent) {
        switch (e.which) {
            case 38: // Up :: previous image
                this.props.selectPreviousFile();
                e.preventDefault();
                break;
            case 40: // Down :: next image
                this.props.selectNextFile();
                e.preventDefault();
                break;
            default:
                break;
        }
    }

    _onClick(e: React.MouseEvent<HTMLTableRowElement>) {
        const path = e.currentTarget.getAttribute("data-path");
        this.props.openPath(path);
    }

    _renderChild(path: string): JSX.Element {
        let className = "";
        if (path === this.props.url) {
            className = "active";
        }

        const name = paths.basename(path);
        return (
            <tr key={path} className={className}
                data-path={path} onClick={this._onClick.bind(this)}>
                <td>
                    {name}
                </td>
            </tr>
        )
    }

    componentDidUpdate() {
        const actives = document.getElementsByClassName('active');
        if (actives.length === 0) { return; }

        const active = actives[0] as HTMLElement;
        scrollIntoViewEx(active);
    }

    render(): JSX.Element {
        const className = `file-listview ${this.props.className}`;
        const files = [].concat(this.props.archs, this.props.files).sort()
        return (
            <div className={className}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.dirs.map(this._renderChild.bind(this))}
                        {files.map(this._renderChild.bind(this))}
                    </tbody>
                </table>
            </div>
        );
    }
}

function hasVerticalScrollbar(elem: Element): boolean {
    if (typeof elem === "undefined") { return false; }
    return elem.scrollHeight > elem.clientHeight;
}

function scrollIntoViewEx(elem: HTMLElement) {
    let parent = elem.parentElement;
    while (typeof parent !== "undefined" && !hasVerticalScrollbar(parent)) {
        parent = parent.parentElement;
    }
    if (typeof parent === "undefined") { return; }

    const parentBottom = parent.scrollTop + parent.clientHeight;
    const clientBottom = elem.offsetTop + elem.offsetHeight;

    // include scroll area
    const topMargin = elem.offsetTop - parent.scrollTop;
    const bottomMargin = parentBottom - clientBottom;
    if (0 <= topMargin && 0 <= bottomMargin) { return; }

    // scroll
    if (topMargin <= 0) {
        // scroll to top
        parent.scrollTop = parent.scrollTop + topMargin;
    } else {
        // scroll to bottom
        parent.scrollTop = parent.scrollTop - bottomMargin;
    }
}

function mapStateToProps(state: reducers.ActionState): ListViewPropValues {
    return {
        url: state.selectedFile,
        dirs: state.dirs,
        archs: state.archs,
        files: state.files,
    };
}

function mapDispatchToProps(dispatch): ListViewPropFunctions {
    return {
        openPath: bindActionCreators(actions.openPath, dispatch),
        selectNextFile: bindActionCreators(actions.selectNextFile, dispatch),
        selectPreviousFile: bindActionCreators(actions.selectPreviousFile, dispatch),
    };
}

const ConnectedListView = connect(mapStateToProps, mapDispatchToProps)(ListView);
export default ConnectedListView;
