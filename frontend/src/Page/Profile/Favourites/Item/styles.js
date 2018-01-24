export default ({ spacing, palette, typography }) => ({
  container: {
    margin: 0,
    padding: '0 15px 15px',
    width: 210,
    height: spacing.fullHeight,
    position: 'relative',
  },
  thumbnail: {
    position: 'relative',
  },
  img: {
    width: spacing.fullWidth,
    height: 120,
    display: 'block',
    objectFit: 'cover',
    background: '#FFFFFF',
  },
  info: {
    // display: 'inline',
    // flexDirection: 'inherit',
    paddingTop: spacing.baseMargin,
  },
  duration: {
    position: 'absolute',
    bottom: spacing.baseMargin + 1,
    right: spacing.baseMargin + 1,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: palette.lightBlack,
  },
  durationText: {
    ...typography.body2,
    color: palette.white,
    fontSize: '0.625em',
    marginLeft: spacing.smallMargin,
    marginRight: spacing.smallMargin,
  },
  name: {
    ...typography.body2,
    fontSize: '0.9em',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    cursor: 'default',
    marginTop: -4,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  singer: {
    ...typography.body2,
    fontSize: '0.725em',
  },
  actions: {
    paddingTop: spacing.baseMargin / 2,
    height: spacing.fullHeight,
  },
  button: {
    width: spacing.fullWidth,
    textTransform: 'none',
  },
});
