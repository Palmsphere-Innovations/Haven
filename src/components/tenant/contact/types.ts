export type Message = {
  id: string;
  sender: "agent" | "tenant";
  text: string;
  time: string;
  dayLabel?: string; // set on the first message of a new day, renders a divider above it
  attachment?: {
    name: string;
    meta: string;
    kind: "image" | "file";
    url?: string;
  };
};

export const initialMessages: Message[] = [
  {
    id: "1",
    sender: "agent",
    dayLabel: "Monday, 14 October",
    time: "10:14 AM",
    text: "Hi Oliver, thanks for flagging the en-suite radiator valve. I've scheduled a Gas Safe engineer to visit Thursday 17 Oct between 10:00 and 12:00. Let me know if that window works.",
  },
  {
    id: "2",
    sender: "agent",
    time: "10:16 AM",
    text: "Also, your updated Gas Safety Certificate has been synced to your Documents tab for your records.",
    attachment: {
      name: "CP12_Cert_Flat4B_Oct2024.pdf",
      meta: "412 KB",
      kind: "file",
    },
  },
  {
    id: "3",
    sender: "tenant",
    time: "10:28 AM",
    text: "Thanks, Thursday morning works great. I'll make sure someone is home.",
  },
  {
    id: "4",
    sender: "agent",
    dayLabel: "Today",
    time: "09:42 AM",
    text: "Perfect — the engineer is on the way, estimated arrival 10:15. Feel free to message here if anything else comes up.",
  },
];
