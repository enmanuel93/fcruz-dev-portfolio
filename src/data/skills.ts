import {
  SiDocker,
  SiDotnet,
  SiGit,
  SiJavascript,
  SiJest,
  SiMysql,
  SiNodedotjs,
  SiPostgresql,
  SiRabbitmq,
  SiReact,
  SiRedis,
  SiRedux,
  SiTypescript,
} from "react-icons/si";
import { TbBrandCSharp, TbDatabase, TbSql, TbTestPipe } from "react-icons/tb";
import { VscAzure, VscAzureDevops } from "react-icons/vsc";
import type { Skill } from "@/types/content";

export const skills = [
  { name: "C#", icon: TbBrandCSharp, color: "#b77ee0" },
  { name: "ASP.NET Core", icon: SiDotnet, color: "#9a7bff" },
  { name: "Entity Framework", icon: TbDatabase, color: "#9a7bff" },
  { name: "React.js", icon: SiReact, color: "#61dafb" },
  { name: "TypeScript", icon: SiTypescript, color: "#4f9cf9" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "Node.js", icon: SiNodedotjs, color: "#6cc24a" },
  { name: "Redux", icon: SiRedux, color: "#a07fe0" },
  { name: "SQL Server", icon: TbSql, color: "#ef6a5f" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#6b8fe8" },
  { name: "MySQL", icon: SiMysql, color: "#5d9bd1" },
  { name: "Redis", icon: SiRedis, color: "#ff5a4e" },
  { name: "Microsoft Azure", icon: VscAzure, color: "#3a9bf0" },
  { name: "Azure DevOps", icon: VscAzureDevops, color: "#3a9bf0" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "RabbitMQ", icon: SiRabbitmq, color: "#ff7a1a" },
  { name: "xUnit", icon: TbTestPipe, color: "#7bc96f" },
  { name: "Jest", icon: SiJest, color: "#e0485a" },
  { name: "Git", icon: SiGit, color: "#f05032" },
] as const satisfies readonly Skill[];
