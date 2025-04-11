"use client"
import { formatBytes } from "@/registry/default/hooks/use-file-upload"
import type React from "react"
import { useState } from "react"

import {
  File,
  FileText,
  FileImage,
  FileArchive,
  FileAudio,
  FileVideo,
  FileIcon as FilePdf,
  FileCode,
  FileSpreadsheet,
  X,
  Download,
  Eye,
} from "lucide-react"

export interface FileItem {
  id: string
  name: string
  size: number
  type: string
  url?: string
  preview?: string
  createdAt?: Date
  updatedAt?: Date
}

export default function Component() {
  // Sample files data - in a real app, this would come from a database or API
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "document.pdf",
      size: 2500000,
      type: "application/pdf",
      url: "#",
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "image.jpg",
      size: 1200000,
      type: "image/jpeg",
      url: "/placeholder.svg?height=400&width=400",
      preview: "/placeholder.svg?height=400&width=400",
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "archive.zip",
      size: 5600000,
      type: "application/zip",
      url: "#",
      createdAt: new Date(),
    },
  ])

  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  const layout = "list"
  const showActions = true
  const showSize = true
  const showDate = false
  const disabled = false
  const className = ""
  const showPreview = true

  if (files.length === 0) {
    return null
  }

  const getFileIcon = (fileType: string, fileName: string) => {
    if (fileType.startsWith("image/")) {
      return <FileImage className="w-5 h-5 text-blue-500" />
    } else if (fileType.includes("pdf")) {
      return <FilePdf className="w-5 h-5 text-red-500" />
    } else if (
      fileType.includes("zip") ||
      fileType.includes("archive") ||
      fileName.endsWith(".zip") ||
      fileName.endsWith(".rar")
    ) {
      return <FileArchive className="w-5 h-5 text-yellow-500" />
    } else if (fileType.includes("audio")) {
      return <FileAudio className="w-5 h-5 text-purple-500" />
    } else if (fileType.includes("video")) {
      return <FileVideo className="w-5 h-5 text-pink-500" />
    } else if (fileType.includes("text") || fileName.endsWith(".txt") || fileName.endsWith(".md")) {
      return <FileText className="w-5 h-5 text-gray-500" />
    } else if (
      fileType.includes("javascript") ||
      fileType.includes("typescript") ||
      fileName.endsWith(".js") ||
      fileName.endsWith(".ts") ||
      fileName.endsWith(".jsx") ||
      fileName.endsWith(".tsx") ||
      fileName.endsWith(".html") ||
      fileName.endsWith(".css")
    ) {
      return <FileCode className="w-5 h-5 text-green-500" />
    } else if (
      fileType.includes("excel") ||
      fileType.includes("spreadsheet") ||
      fileName.endsWith(".xls") ||
      fileName.endsWith(".xlsx") ||
      fileName.endsWith(".csv")
    ) {
      return <FileSpreadsheet className="w-5 h-5 text-green-600" />
    }

    return <File className="w-5 h-5 text-gray-400" />
  }

  const formatDate = (date?: Date) => {
    if (!date) return ""
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const handlePreview = (e: React.MouseEvent, file: FileItem) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedFile(file)
    setIsPreviewOpen(true)
    // In a real app, you would show a preview modal or navigate to a preview page
    console.log(`Previewing file: ${file.name}`)
    alert(`Previewing ${file.name}`)
  }

  const handleDownload = (e: React.MouseEvent, file: FileItem) => {
    e.preventDefault()
    e.stopPropagation()
    // In a real app, you would trigger a download
    console.log(`Downloading file: ${file.name}`)
    alert(`Downloading ${file.name}`)
  }

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    e.stopPropagation()
    // Remove the file from the state
    setFiles(files.filter((file) => file.id !== id))
    console.log(`Removing file with id: ${id}`)
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {files.map((file) => (
        <div key={file.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center min-w-0 flex-1">
            <div className="mr-3 flex-shrink-0">
              {showPreview && file.preview && file.type.startsWith("image/") ? (
                <div
                  className="w-10 h-10 rounded overflow-hidden bg-gray-100 cursor-pointer"
                  onClick={(e) => !disabled && handlePreview(e, file)}
                >
                  <img
                    src={file.preview || "/placeholder.svg"}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                  {getFileIcon(file.type, file.name)}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-700 truncate" title={file.name}>
                {file.name}
              </p>

              <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                {showSize && <span>{formatBytes(file.size)}</span>}

                {showSize && showDate && file.createdAt && <span>•</span>}

                {showDate && file.createdAt && <span>{formatDate(file.createdAt)}</span>}
              </div>
            </div>
          </div>

          {showActions && !disabled && (
            <div className="flex items-center ml-4 space-x-1">
              <button
                type="button"
                onClick={(e) => handlePreview(e, file)}
                className="p-1 text-gray-400 hover:text-gray-700 transition-colors rounded-full"
                aria-label="Preview file"
              >
                <Eye className="w-4 h-4" />
              </button>

              {file.url && (
                <button
                  type="button"
                  onClick={(e) => handleDownload(e, file)}
                  className="p-1 text-gray-400 hover:text-gray-700 transition-colors rounded-full"
                  aria-label="Download file"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={(e) => handleRemove(e, file.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors rounded-full"
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
