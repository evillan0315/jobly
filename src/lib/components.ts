import { SkillGroup } from "@/types/models";

export const UserProfileFormComponentData = {
  component: "UserProfileForm",
  props: {
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      bio: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      dateOfBirth: null,
      profilePicture: null,
    },
    validationSchema: {
      firstName: "required|string|min:2|max:50",
      lastName: "required|string|min:2|max:50",
      email: "required|email",
      phoneNumber: "string|min:10|max:20",
      bio: "string",
      address: {
        street: "required|string",
        city: "required|string",
        state: "required|string",
        zipCode: "required|string",
      },
      dateOfBirth: "date", // Assuming you're using a date picker component
      profilePicture: "string", // For image URLs or file paths
    },
    onSubmit: "handleSubmit",
  },
};

export const HeroComponentData = {
  component: "Hero",
  type: "section",
  props: {
    title: "Welcome to Our Website",
    subtitle: "Discover amazing things here!",
    image: {
      src: "/images/hero-image.jpg",
      alt: "Hero Image",
      variant: "standard",
      shape: "rectangle",
      loading: "lazy",
    },
    button: {
      label: "Learn More",
      variant: "contained",
      color: "primary",
      size: "large",
      fullWidth: true,
      align: "center",
    },
    containerMaxWidth: "lg",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
    height: "500px",
    minHeight: "300px",
  },
};
export const NavigationComponentData = {
  component: "Navigation",
  props: {
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Contact", href: "/contact" },
    ],
  },
};
export const FooterComponentData = {
  component: "Footer",
  props: {
    copyright: "© 2024 Your Name",
  },
};
export const ContactComponentData = {
  component: "Contact",
  props: {
    title: "Contact Me",
    email: "your_email@example.com",
    phone: "+123 456 7890",
    linkedinUrl: "https://www.linkedin.com/in/your-linkedin-profile",
    githubUrl: "https://github.com/your-github-username",
  },
};

export const AboutMeComponentData = {
  component: "AboutMe",
  props: {
    title: "About Me",
    description: "A brief introduction about myself and my skills.",
    profilePicture: "/images/profile.jpg",
  },
};
export const SkillsComponentData: SkillGroup = {
  component: "Skills",
  props: [
    {
      title: "Frontend Development",
      items: [
        { name: "Next.js", icon: "SiNextdotjs" },
        { name: "React", icon: "SiReact" },
        { name: "Javascript", icon: "SiJavascript" },
        { name: "Material-UI", icon: "SiMaterialui" },
        { name: "Tailwind CSS", icon: "SiTailwindcss" },
      ],
    },
    {
      title: "Backend Development",
      items: [
        { name: "Python", icon: "SiPython" },
        { name: "Node.js", icon: "SiNodedotjs" },
        { name: "Typescript", icon: "SiTypescript" },
        { name: "PHP", icon: "SiPhp" },
        { name: "Prisma", icon: "SiPrisma" },
      ],
    },
    {
      title: "Cloud & DevOps",
      items: [
        { name: "AWS", icon: "SiAmazonaws" },
        { name: "Docker", icon: "SiDocker" },
        { name: "Kubernetes", icon: "SiKubernetes" },
        { name: "CI/CD (GitHub Actions)", icon: "SiGithub" },
      ],
    },
    {
      title: "Database Management",
      items: [
        { name: "PostgreSQL", icon: "SiPostgresql" },
        { name: "MongoDB", icon: "SiMongodb" },
        { name: "MySQL", icon: "SiMysql" },
        { name: "GraphQL", icon: "SiGraphql" },
        { name: "DynamoDB", icon: "SiAmazondynamodb" },
      ],
    },
    {
      title: "API Integration",
      items: [
        { name: "RESTful APIs", icon: "MdApi" },
        { name: "OAuth/JWT", icon: "TbBrandOauth" },
        { name: "Paypal", icon: "SiPaypal" },
        { name: "Stripe", icon: "SiStripe" },
      ],
    },
    {
      title: "AI Integration",
      items: [
        { name: "M/L Models", icon: "TbAi" },
        { name: "ChatGPT", icon: "SiOpenai" },
        { name: "Google Gemini", icon: "SiGooglegemini" },
        { name: "Tensorflow", icon: "SiTensorflow" },
      ],
    },
  ],
};
export const ProjectCardComponentData = {
  component: "ProjectCard",
  props: {
    title: "Project Title",
    description: "Brief project description.",
    technologies: ["React", "Node.js", "MongoDB"],
    imageUrl: "/images/project1.jpg",
    githubUrl: "https://github.com/username/project-repo",
    liveUrl: "https://live-demo.com",
  },
};
