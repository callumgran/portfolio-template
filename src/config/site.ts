export type SiteConfig = {
  name: string;
  role?: string;
  location?: string;
  initials?: string;
  profileImage?: string;
  features: {
    blog: boolean;
    projects: boolean;
  };
  cv: {
    /** Route in this app that hosts the CV page */
    route: string;
    /** Public path to the PDF file */
    pdfPath: string;
  };
  contact: {
    email?: string;
    github?: string;
    linkedin?: string;
  };
};

export const siteConfig: SiteConfig = {
  name: 'Your Name',
  role: 'Role',
  location: 'Location',
  initials: 'YN',
  profileImage: '/me.jpg',
  features: {
    blog: true,
    projects: true,
  },
  cv: {
    route: '/cv',
    pdfPath: '/cv.pdf',
  },
  contact: {
    email: 'you@example.com',
    github: 'https://github.com/your-handle',
    linkedin: 'https://www.linkedin.com/in/your-handle',
  },
};
