declare global {
  type MenuData = {
    [key: string]: {
      title: string;
      description: string;
      items: { icon: React.ReactNode; label: string; link: string }[];
    };
  };
}

export {};
