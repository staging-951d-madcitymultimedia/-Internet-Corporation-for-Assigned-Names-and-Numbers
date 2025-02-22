import { useQuery } from '@tanstack/react-query';
import wpcom from 'calypso/lib/wp';
import type { SubscriberStats } from '../types';

const useSubscriberStatsQuery = (
	siteId: number | null,
	subscriptionId: number | undefined,
	userId: number | undefined
) => {
	return useQuery< SubscriberStats >( {
		queryKey: [ 'subscriber-stats', { subscriptionId, userId } ],
		queryFn: () => {
			if ( userId ) {
				return wpcom.req.get( {
					path: `/sites/${ siteId }/individual-subscriber-stats?user_id=${ userId }`,
					args: { user_id: userId },
					apiNamespace: 'wpcom/v2',
				} );
			} else if ( subscriptionId ) {
				return wpcom.req.get( {
					path: `/sites/${ siteId }/individual-subscriber-stats?subscription_id=${ subscriptionId }`,
					apiNamespace: 'wpcom/v2',
				} );
			}
		},
		enabled: !! siteId,
		keepPreviousData: true,
	} );
};

export default useSubscriberStatsQuery;
