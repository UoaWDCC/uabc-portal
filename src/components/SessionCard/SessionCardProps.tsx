/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import { SessionCardStatus } from "./SessionCardStatusEnum";

type SessionCardProps = {
  //props here
  startdate: Date;
  enddate: Date;
  location: string;
  status: SessionCardStatus;
};

export default SessionCardProps;
