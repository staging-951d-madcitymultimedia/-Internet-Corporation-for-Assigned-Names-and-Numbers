import { getUrlParts } from '@automattic/calypso-url';
import { omitBy } from 'lodash';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from 'calypso/lib/navigate';
import { createAccountUrl } from 'calypso/lib/paths';
import { isUserLoggedIn } from 'calypso/state/current-user/selectors';
import { follow, unfollow } from 'calypso/state/reader/follows/actions';
import { isFollowing } from 'calypso/state/reader/follows/selectors';
import FollowButton from './button';

const noop = () => {};

class FollowButtonContainer extends Component {
	static propTypes = {
		siteUrl: PropTypes.string.isRequired,
		iconSize: PropTypes.number,
		onFollowToggle: PropTypes.func,
		followLabel: PropTypes.string,
		followingLabel: PropTypes.string,
		feedId: PropTypes.number,
		siteId: PropTypes.number,
		followIcon: PropTypes.object,
		followingIcon: PropTypes.object,
		hasButtonStyle: PropTypes.bool,
	};

	static defaultProps = {
		onFollowToggle: noop,
	};

	handleFollowToggle = ( following ) => {
		if ( ! this.props.isLoggedIn ) {
			const { pathname } = getUrlParts( window.location.href );
			return navigate( createAccountUrl( { redirectTo: pathname, ref: 'reader-lp' } ) );
		}
		if ( following ) {
			const followData = omitBy(
				{
					feed_ID: this.props.feedId,
					blog_ID: this.props.siteId,
				},
				( data ) => typeof data === 'undefined'
			);

			this.props.follow( this.props.siteUrl, followData );
		} else {
			this.props.unfollow( this.props.siteUrl );
		}
		this.props.onFollowToggle( following );
	};

	render() {
		return (
			<FollowButton
				following={ this.props.following }
				onFollowToggle={ this.handleFollowToggle }
				iconSize={ this.props.iconSize }
				tagName={ this.props.tagName }
				disabled={ this.props.disabled }
				followLabel={ this.props.followLabel }
				followingLabel={ this.props.followingLabel }
				className={ this.props.className }
				followIcon={ this.props.followIcon }
				followingIcon={ this.props.followingIcon }
				hasButtonStyle={ this.props.hasButtonStyle }
			/>
		);
	}
}

export default connect(
	( state, ownProps ) => ( {
		following: isFollowing( state, { feedUrl: ownProps.siteUrl } ),
		isLoggedIn: isUserLoggedIn( state ),
	} ),
	{
		follow,
		unfollow,
	}
)( FollowButtonContainer );
