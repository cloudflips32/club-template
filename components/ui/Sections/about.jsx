import * as React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Globe, Users } from "lucide-react";

const About = () => {
  return (
    <>
      <section
        id="about"
        className="w-full py-12 md:py-24 lg:py-32 bg-slate-100"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl letter font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            About Us
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Code className="h-8 w-8 mb-2" />
                <CardTitle>Skill Development</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Enhance your coding skills through workshops, hackathons,
                  and collaborative projects.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 mb-2" />
                <CardTitle>Networking</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Connect with like-minded individuals and industry
                  professionals to expand your network.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="h-8 w-8 mb-2" />
                <CardTitle>Industry Exposure</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Gain insights into the latest trends and technologies
                  shaping the software engineering landscape.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

export default About