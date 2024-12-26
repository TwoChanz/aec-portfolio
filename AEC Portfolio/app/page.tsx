'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Leaf, Award, Download } from 'lucide-react'
import { Header } from "@/components/Header"
import { AnimatedHero } from "@/components/AnimatedHero"
import { ProjectCard } from "@/components/ProjectCard"
import { DynamicBackground } from "@/components/DynamicBackground"
import Image from "next/image"

export default function PortfolioPage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <div ref={ref} className="relative min-h-screen overflow-hidden">
      <DynamicBackground />
      
      <Header />
      
      <main className="pt-16">
        <AnimatedHero />

        <motion.div 
          className="container mx-auto p-6"
          style={{ y }}
        >
          <Tabs defaultValue="projects" className="w-full mt-12">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <ProjectCard 
                  id="eco-office-tower"
                  title="Eco-Office Tower"
                  description="Award-winning sustainable office building with LEED Platinum certification"
                  category="Architecture"
                  imageUrl="/placeholder.svg?height=400&width=600"
                  awards={["Best Sustainable Design 2023"]}
                  sustainabilityScore={95}
                />
                <ProjectCard 
                  id="smart-bridge"
                  title="Smart Bridge"
                  description="Innovative bridge design with real-time structural health monitoring"
                  category="Engineering"
                  imageUrl="/placeholder.svg?height=400&width=600"
                  awards={["Engineering Excellence Award"]}
                  sustainabilityScore={80}
                />
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <SkillItem name="BIM" level={90} />
                    <SkillItem name="AutoCAD" level={85} />
                    <SkillItem name="Revit" level={80} />
                    <SkillItem name="3D Modeling" level={75} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center mb-4">
                    <Image
                      src="/portfoliocard-Pp01rYfhIXiT74ukSCoO8Bwt4Jj2hx.png"
                      alt="Chandler Hopkins"
                      width={200}
                      height={200}
                      className="rounded-full mb-4 md:mb-0 md:mr-6"
                    />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Chandler Hopkins</h3>
                      <div className="h-48 overflow-y-auto pr-4 mb-4">
                        <p>
                          I specialize in Reality Capture and Scan-to-BIM workflows, integrating technology to streamline AEC processes. With a passion for innovative solutions, I bring cutting-edge techniques to every project, ensuring efficiency and accuracy in the built environment.
                        </p>
                        <p className="mt-2">
                          My expertise spans across various aspects of digital construction, including 3D laser scanning, photogrammetry, and point cloud processing. I've successfully led projects that have revolutionized how we approach building information modeling, resulting in significant time and cost savings for clients.
                        </p>
                        <p className="mt-2">
                          As a thought leader in the AEC tech space, I regularly contribute to industry publications and speak at conferences, sharing insights on the future of construction technology and its impact on project delivery.
                        </p>
                      </div>
                      <Button className="w-full" onClick={() => window.open('/path-to-your-cv.pdf', '_blank')}>
                        <Download className="mr-2 h-4 w-4" /> Download CV
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <input 
                      type="email" 
                      placeholder="Email"
                      className="w-full p-2 border rounded bg-background"
                    />
                    <textarea 
                      placeholder="Message"
                      className="w-full p-2 border rounded h-32 bg-background"
                    />
                    <Button>Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  )
}

function SkillItem({ name, level }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full">
        <motion.div 
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

