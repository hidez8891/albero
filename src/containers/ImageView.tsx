import * as React from "react";
import { connect } from "react-redux";
import { AlberoServer } from "../library/AlberoServer";
import * as reducers from "../reducers";

interface ImageViewPropValues extends React.Props<ImageView> {
    url: string;
    className?: string;
}

interface ImageViewPropFunctions extends React.Props<ImageView> {
}

interface ImageViewProps extends ImageViewPropValues, ImageViewPropFunctions {
}

class ImageView extends React.Component<ImageViewProps, undefined> {
    constructor(props: ImageViewProps) {
        super(props);
    }

    render(): JSX.Element {
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

function mapStateToProps(state: reducers.ActionState): ImageViewPropValues {
    return { url: state.selectedFile };
}

function mapDispatchToProps(dispatch): ImageViewPropFunctions {
    return {};
}

const ConnectedImageView = connect(mapStateToProps, mapDispatchToProps)(ImageView);
export default ConnectedImageView;
