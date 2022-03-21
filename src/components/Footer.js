import React from 'react';
import '../styles/footer.scss';
import { Stack, Image } from "react-bootstrap";
import Paras from '../assets/paras.svg';
import Twitter from '../assets/twitter.svg';
import Discord from '../assets/discord.svg';

const Footer = () => {
  return (
    <div className="footer">
      <Stack className="footer_content" gap={3}>
        <Stack direction="horizontal" className="pull-right" gap={3}>
          <a href="/#">About</a>
          <a href="/#">How To Play</a>
          <a href="/#">FAQ</a>
        </Stack>
        <Stack direction="horizontal" className="mt-2" gap={3}>
          <Image src={Paras} />          
          <Image src={Twitter} />          
          <Image src={Discord} />          
        </Stack>
      </Stack>
    </div>
  );
};

export default Footer;