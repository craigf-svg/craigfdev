const CERT_LINKS = [
  'https://www.credly.com/badges/288ad8ce-ad14-49d5-aff1-daf6414f6fa6/public_url',
  'https://www.credly.com/badges/d6ac230d-01cf-4702-8015-a46ede4e6b79/public_url',
  'https://www.credly.com/badges/605dc82b-1699-436a-bc36-03652127bf12/public_url',
];

const PROFILE_LINKS = {
  linkedin: 'https://www.linkedin.com/in/craig-f/',
  github: 'https://github.com/craigf-svg',
};

const styles = {
  nameText: {
    margin: '0px 0px 0px 5px'
  },
  buttons: {
    position: 'absolute',
    right: 12,
    top: 5,
    color: 'white',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  icon: { padding: '1px 7px 0px 0px' },
  drawerContent: {
    fontFamily: 'Roboto',
    fontSize: 20,
    padding: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    textAlign: 'center',
    marginTop: 20,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  cert: {
    width: 120,
    height: 120,
    border: '3px solid black',
    borderRadius: 16,
    margin: '0px 5px 0px 5px',
    cursor: 'pointer'
  },
  image: {
    width: 100,
    height: 100,
    border: '3px solid black',
    borderRadius: 16,
    margin: '0px 5px 0px 5px',
    cursor: 'pointer'
  },
  smallerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px'
  },
  smallerImage: {
    width: 50,
    height: 50,
    border: '3px solid black',
    borderRadius: 16,
    margin: '0px 5px 0px 5px',
    cursor: 'pointer'
  },
  flyModeContainer: {
    marginTop: 20,
    textAlign: 'center',
  },
  flyButton: {
    background: "rgb(11,107,203)",//'#3a3bf7',
    marginTop: 10,
  },
};

export { CERT_LINKS, PROFILE_LINKS, styles };