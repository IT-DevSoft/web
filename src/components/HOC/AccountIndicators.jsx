import React from "react";
import { Pages } from "../../common/const";
import { PaymentsComponent } from "../PaymentsComponent";
import { AccrualsComponent } from "../AccrualsComponent";
import { MeteringDevicesComponent } from "../MeteringDevicesComponent";

export const AccountIndicators = ({ page = Pages.PAYMENTS.key, serviceId }) => {
  const renderSwitch = () => {
    switch (page) {
      case Pages.PAYMENTS.key:
        return <PaymentsComponent serviceId={serviceId} />;
      case Pages.ACCRUALS.key:
        return <AccrualsComponent serviceId={serviceId} />;
      case Pages.METERING_DEVICES.key:
        return <MeteringDevicesComponent serviceId={serviceId} />;
      default:
        return <></>;
    }
  };

  return renderSwitch();
};
