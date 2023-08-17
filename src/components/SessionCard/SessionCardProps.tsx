/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import { ChangeEvent } from "react";
import { SessionCardStatus } from "./SessionCardStatusEnum";

type SessionCardProps = {
  id: string;
  startDate: Date;
  endDate: Date;
  location: string;
  status: SessionCardStatus;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default SessionCardProps;
