"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const LeadFormModalClient = dynamic(
  () => import("../ui/LeadFormModalClient").then((m) => ({ default: m.LeadFormModalClient })),
  { ssr: false }
);

const LanguageInterestPopupClient = dynamic(
  () => import("./LanguageInterestPopup").then((m) => ({ default: m.LanguageInterestPopup })),
  { ssr: false }
);

interface Props {
  lang: string;
  formDict: any;
  popupDict: any;
}

export default function DeferredModals({ lang, formDict, popupDict }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return null;

  return (
    <>
      {formDict && <LeadFormModalClient formDict={formDict} />}
      {popupDict && <LanguageInterestPopupClient lang={lang} dict={popupDict} />}
    </>
  );
}
