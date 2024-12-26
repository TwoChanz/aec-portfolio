import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Award } from 'lucide-react'
import { ModelViewer } from "@/components/ModelViewer"

const projects = [
  {
    id: "eco-office-tower",
    title: "Eco-Office Tower",
    description: "Award-winning sustainable office building with LEED Platinum certification",
    category: "Architecture",
    imageUrl: "/placeholder.svg?height=400&width=600",
    modelUrl: "/assets/3d/duck.glb", // Using the sample 3D model
    awards: ["Best Sustainable Design 2023"],
    sustainabilityScore: 95,
    caseStudy: {
      challenge: "Design a high-rise office building with minimal environmental impact.",
      solution: "Implemented cutting-edge green technologies and sustainable materials.",
      results: "Achieved LEED Platinum certification and reduced energy consumption by 40%.",
    },
  },
  {
    id: "smart-bridge",
    title: "Smart Bridge",
    description: "Innovative bridge design with real-time structural health monitoring",
    category: "Engineering",
    imageUrl: "/placeholder.svg?height=400&width=600",
    modelUrl: "/assets/3d/duck.glb", // Using the sample 3D model
    awards: ["Engineering Excellence Award"],
    sustainabilityScore: 80,
    caseStudy: {
      challenge: "Create a bridge with advanced monitoring capabilities for improved safety and maintenance.",
      solution: "Integrated IoT sensors and AI-powered analytics for real-time structural health monitoring.",
      results: "Reduced maintenance costs by 30% and improved overall bridge safety.",
    },
  },
]

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <main className="container mx-auto p-6">
      <Button variant="ghost" href="/" className="mb-6">
        ← Back to Portfolio
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-muted-foreground">{project.category}</div>
            <SustainabilityBadge score={project.sustainabilityScore} />
          </div>
          <CardTitle className="text-3xl flex items-center gap-2">
            {project.title}
            {project.awards && project.awards.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                <Award className="w-3 h-3 mr-1" />
                Award Winner
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img src={project.imageUrl} alt={project.title} className="w-full h-auto rounded-lg mb-4" />
              <p className="text-lg mb-4">{project.description}</p>
              {project.awards && project.awards.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Awards:</h3>
                  <ul className="list-disc list-inside">
                    {project.awards.map((award, index) => (
                      <li key={index}>{award}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">3D Model Visualization</h3>
              <ModelViewer modelUrl={project.modelUrl} />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Case Study</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Challenge</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{project.caseStudy.challenge}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{project.caseStudy.solution}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{project.caseStudy.results}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

function SustainabilityBadge({ score }: { score: number }) {
  let color = "bg-red-500"
  if (score >= 80) color = "bg-green-500"
  else if (score >= 60) color = "bg-yellow-500"

  return (
    <div className="flex items-center gap-1">
      <Leaf className="w-4 h-4 text-green-500" />
      <span className={`text-xs font-semibold px-2 py-1 rounded ${color}`}>
        {score}%
      </span>
    </div>
  )
}

