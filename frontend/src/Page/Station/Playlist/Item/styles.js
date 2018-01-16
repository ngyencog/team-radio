export default ({ spacing, palette, typography }) => ({
  container: {
    margin: 0,
    height: '80px',
    width: '100%',
    '&.playing': {
      background: palette.lightGrey['500'],
    },
  },
  thumbnail: {},
  img: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
    background: '#FFFFFF',
  },
  info: {
    padding: spacing.baseMargin,
    position: 'relative',
  },
  name: {
    ...typography.body2,
    fontSize: '0.825em',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
  },
  singer: {
    ...typography.body2,
    fontSize: '0.725em',
  },
  creator: {
    position: 'absolute',
    bottom: spacing.baseMargin,
    ...typography.caption,
    fontSize: '0.725em',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  creatorAvatar: {
    marginLeft: spacing.baseMargin,
    width: '1.6em',
    height: '1.6em',
    border: '1px solid #ccc',
    borderRadius: '50%',
    objectFit: 'contain',
    cursor: 'pointer',
  },
  actions: {
    textAlign: 'center',
    alignSelf: 'center',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },
  action: {
    width: spacing.baseMargin * 3,
    height: spacing.baseMargin * 3,
    '& .material-icons': {
      fontSize: spacing.baseMargin * 3,
    },
  },
  score: {
    ...typography.body2,
    margin: 'auto',
    width: spacing.baseMargin * 3,
    fontSize: '0.825em',
    color: palette.secondary['500'],
    '&.active': {
      color: palette.primary['500'],
    },
  },
  durationText: {
    color: 'rgba(0,0,0,0.54)',
    marginLeft: spacing.smallMargin,
  },
});
