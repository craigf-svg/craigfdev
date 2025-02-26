import React, { useState } from 'react';
import { Button, Drawer, ModalClose, Link, Typography } from '@mui/joy';
import { Menu, Cameraswitch } from '@mui/icons-material';
import solutionsArchitect from './media/awssolutions.png';
import cloudPractitioner from './media/awscloud.png';
import cloudQuestCloudPractitioner from './media/awscloudquest.png';
import linkedinLogo from './media/LinkedInLogo.svg';
import githubLogo from './media/GithubLogo.svg';
import { CERT_LINKS, PROFILE_LINKS, styles } from './DrawerInfo';

export default function MyDrawer({ cycleCamPosition, enableFlyControls }) {
  const [open, setOpen] = useState(false);

  const openLink = (url) => window.open(url);

  return (
    <>
      <div style={styles.buttons}>
        <Cameraswitch style={styles.icon} onClick={() => cycleCamPosition('two')} />
        <Menu onClick={() => setOpen((prev) => !prev)} />
      </div>

      <Drawer open={open} anchor="right" size="md" onClose={() => setOpen(false)}>
        <ModalClose />
        <div style={styles.drawerContent}>
          <Typography level="h4">
            <Typography level="h1" style={styles.nameText}>Hi, I'm Craig </Typography>
            <Typography>
              a seasoned software developer who enjoys solving complex problems while continuously
              learning new technologies. My goal is to deliver software that solves problems I am passionate about. This portfolio will evolve as I add new projects and update existing ones.
            </Typography>
          </Typography>

          <Typography level="h4" style={{ marginTop: 10 }}>
            <Typography>
              I want to thank the open-source
              developer collective <Link href="https://pmnd.rs">Poimandres</Link> for maintaining and updating projects used in this project,
              such as <Link href="https://github.com/pmndrs/react-three-fiber">react-three-fiber</Link>, <Link href="https://github.com/pmndrs/drei">drei</Link>, and <Link href="https://github.com/pmndrs/react-postprocessing">react-postprocessing</Link>.
            </Typography>
            <Typography> I'm always open to new opportunities or discussions - let's connect!</Typography>
          </Typography>
          <div>
            {/** TODO: Change from row to column on smaller window width */}
            <Typography level="h3" style={styles.sectionTitle}>Certifications</Typography>
            <div style={styles.container}>
              {[solutionsArchitect, cloudPractitioner, cloudQuestCloudPractitioner].map((logo, index) => (
                <img
                  src={logo}
                  style={styles.cert}
                  alt="AWS Certification"
                  key={index}
                  onClick={() => openLink(CERT_LINKS[index])}
                />
              ))}
            </div>
          </div>
          <div>
            <Typography level="h3" style={styles.sectionTitle}>Connect</Typography>
            <div style={styles.container}>
              <img src={linkedinLogo} alt="LinkedIn" style={styles.image} onClick={() => openLink(PROFILE_LINKS.linkedin)} />
              <img src={githubLogo} alt="GitHub" style={styles.image} onClick={() => openLink(PROFILE_LINKS.github)} />
            </div>
          </div>

          <div style={styles.flyModeContainer}>
            <Typography level="h4">
              Thank you for reading this far! As a reward, click below to enable fly mode with arrow keys and WASD (Q+E for
              roll, R+F for elevation).
            </Typography>
            <Button size='lg' onClick={() => { enableFlyControls(); setOpen(false); }} style={styles.flyButton}>
              Fly Mode
            </Button>
          </div>
        </div>
      </Drawer >
    </>
  );
}