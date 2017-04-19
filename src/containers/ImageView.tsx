import * as React from 'react';
import { connect } from 'react-redux';
import * as reducers from '../reducers';
import { AlberoServer } from '../library/AlberoServer'

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
            let url = AlberoServer.toImgURL(this.props.url);
            img = <img src={url} />
        }

        let className = `image-view ${this.props.className}`;
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
