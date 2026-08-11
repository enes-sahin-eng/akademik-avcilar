"use client";

import dynamic from "next/dynamic";

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
  return (
    <>
      {formDict && <LeadFormModalClient formDict={formDict} />}
      {popupDict && <LanguageInterestPopupClient lang={lang} dict={popupDict} />}
    </>
  );
}
