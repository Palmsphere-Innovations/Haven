"use client";

import { useEffect, useState } from "react";
import { getLandlordProfile } from "@/lib/api";
import { landlordsData } from "@/lib/mock/landlord";
import type { LandlordRecord } from "@/types";

export function useLandlordProfile(): LandlordRecord {
  const [profile, setProfile] = useState<LandlordRecord>(landlordsData[0]);

  useEffect(() => {
    let isCurrent = true;

    getLandlordProfile().then((landlord) => {
      if (isCurrent) setProfile(landlord);
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  return profile;
}
