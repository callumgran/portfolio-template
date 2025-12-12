import { promises as fs } from 'fs';
import path from 'path';

const HOME_DIR = path.join(process.cwd(), 'content', 'home');

export const getHomeAboutMdx = async (): Promise<string> => {
  const filePath = path.join(HOME_DIR, 'about.mdx');
  return fs.readFile(filePath, 'utf8');
};

export const getHomeSkills = async (): Promise<string[]> => {
  const filePath = path.join(HOME_DIR, 'skills.txt');
  const raw = await fs.readFile(filePath, 'utf8');

  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'));
};
