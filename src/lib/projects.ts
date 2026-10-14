import { PROJECT_DATA } from "@/data/projects";

// Looks up a project by title. Throws so a typo in page content fails the build instead of shipping a broken card.
export function getProject(title: string) {
    const project = PROJECT_DATA.find((p) => p.title === title);
    if (!project) throw new Error(`Unknown project "${title}"`);
    return project;
}
