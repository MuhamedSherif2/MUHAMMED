import type { Metadata } from "next";
import AllProjects from "@/layout/projects/AllProjects";

export const metadata: Metadata = {
    title: "Projects | Mohamed Sherif",
    description: "A complete list of my web development projects.",
};

export default function ProjectsPage() {
    return <AllProjects />;
}