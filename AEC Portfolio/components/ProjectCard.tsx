'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, Award } from 'lucide-react'

interface ProjectCardProps {
  id: string
  title: string
  description: string
  category: string
  imageUrl: string
  awards: string[]
  sustainabilityScore: number
}

export function ProjectCard({ id, title, description, category, imageUrl, awards, sustainabilityScore }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <Card className="overflow-hidden">
        <motion.img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-muted-foreground">{category}</div>
            <SustainabilityBadge score={sustainabilityScore} />
          </div>
          <CardTitle className="flex items-center gap-2">
            {title}
            {awards && awards.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                <Award className="w-3 h-3 mr-1" />
                Award Winner
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="mt-4" asChild>
              <a href={`/projects/${id}`}>View Details</a>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SustainabilityBadge({ score }: { score: number }) {
  let color = "bg-red-500"
  if (score >= 80) color = "bg-green-500"
  else if (score >= 60) color = "bg-yellow-500"

  return (
    <motion.div 
      className="flex items-center gap-1"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Leaf className="w-4 h-4 text-green-500" />
      <span className={`text-xs font-semibold px-2 py-1 rounded ${color}`}>
        {score}%
      </span>
    </motion.div>
  )
}

