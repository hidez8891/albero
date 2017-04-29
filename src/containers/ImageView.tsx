import * as React from "react";
import { connect } from "react-redux";
import { AlberoServer } from "../library/AlberoServer";
import * as reducers from "../reducers";

interface IImageViewPropValues extends React.Props<ImageView> {
    url: string;
    className?: string;
}

interface IImageViewPropFunctions extends React.Props<ImageView> {
}

interface IImageViewProps extends IImageViewPropValues, IImageViewPropFunctions {
}

class ImageView extends React.Component<IImageViewProps, undefined> {
    constructor(props: IImageViewProps) {
        super(props);
    }

    public render(): JSX.Element {
        let img = null;
        if (this.props.url.length !== 0) {
            const url = AlberoServer.toImgURL(this.props.url);
            img = <img src={url} />;
        }

        const className = `image-view ${this.props.className}`;
        return (
            <div className={className}>
                {img}
            </div>
        );
    }
}

function mapStateToProps(state: reducers.IActionState): IImageViewPropValues {
    return { url: state.selectedFile };
}

function mapDispatchToProps(dispatch): IImageViewPropFunctions {
    return {};
}

const ConnectedImageView = connect(mapStateToProps, mapDispatchToProps)(ImageView);
export default ConnectedImageView;
