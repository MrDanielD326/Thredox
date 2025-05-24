import { Card, CardBody, CardHeader } from "@heroui/react";

export const FeatureCard = ({ title, description }: { title: string; description: string }) => (
    <Card shadow="sm" radius="lg" fullWidth={true}>
        <CardHeader className="text-lg font-semibold text-secondary"> {title} </CardHeader>
        <CardBody > {description} </CardBody>
    </Card>
);