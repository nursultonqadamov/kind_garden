"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, AlertTriangle, LogOut, MessageSquare, Plus } from "lucide-react"

interface User {
  id: number
  username: string
  first_name: string
  last_name: string
  role: "admin" | "cook"
  full_name: string
}

interface Product {
  id: number
  name: string
  unit: string
}

interface StockLot {
  id: number
  product: Product
  quantity: number
  status: "ok" | "warning" | "danger"
  updated_at: string
}

interface UsageReport {
  id: number
  date: string
  product: Product
  amount_used: number
  expected_amount: number
  cook_name: string
  used_extra: boolean
  is_overused: boolean
  warning_message: string
}

interface Message {
  id: number
  sender: string
  receiver: string
  subject: string
  content: string
  is_read: boolean
  created_at: string
  replies: Array<{
    id: number
    sender: string
    content: string
    created_at: string
    is_read: boolean
  }>
}

interface AdminDashboardProps {
  user: User
  onLogout: () => void
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [stockLots, setStockLots] = useState<StockLot[]>([])
  const [usageReports, setUsageReports] = useState<UsageReport[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  // Mahsulot qo'shish
  const [productName, setProductName] = useState("")
  const [productUnit, setProductUnit] = useState("kg")
  const [productQuantity, setProductQuantity] = useState("")

  // Javob berish
  const [replyContent, setReplyContent] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token")
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }

  const fetchData = async () => {
    try {
      const [productsRes, reportsRes, messagesRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/products/products/", {
          headers: getAuthHeaders(),
        }),
        fetch("http://127.0.0.1:8000/api/reports/usage-reports/", {
          headers: getAuthHeaders(),
        }),
        fetch("http://127.0.0.1:8000/api/messages/messages/", {
          headers: getAuthHeaders(),
        }),
      ])

      if (productsRes.ok) {
        const productsData = await productsRes.json()
        setStockLots(productsData)
      }

      if (reportsRes.ok) {
        const reportsData = await reportsRes.json()
        setUsageReports(reportsData)
      }

      if (messagesRes.ok) {
        const messagesData = await messagesRes.json()
        setMessages(messagesData)
      }
    } catch (error) {
      console.error("Data fetch error:", error)
    }
  }

  const addProduct = async () => {
    if (!productName || !productQuantity) {
      alert("Mahsulot nomi va miqdorini kiriting!")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/products/products/create/", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: productName,
          unit: productUnit,
          quantity: Number.parseFloat(productQuantity),
        }),
      })

      if (response.ok) {
        setProductName("")
        setProductQuantity("")
        fetchData()
        alert("Mahsulot muvaffaqiyatli qo'shildi!")
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Mahsulot qo'shishda xatolik")
      }
    } catch (error) {
      alert("Server bilan bog'lanishda xatolik")
    } finally {
      setLoading(false)
    }
  }

  const replyToMessage = async (messageId: number) => {
    if (!replyContent.trim()) {
      alert("Javob matnini kiriting!")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/messages/messages/reply/", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          parent_message_id: messageId,
          content: replyContent,
        }),
      })

      if (response.ok) {
        setReplyContent("")
        setReplyingTo(null)
        fetchData()
        alert("Javob yuborildi!")
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Javob yuborishda xatolik")
      }
    } catch (error) {
      alert("Server bilan bog'lanishda xatolik")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ok":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "danger":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600">{user.full_name}</p>
          </div>
          <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Chiqish
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Mahsulotlar
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Hisobotlar
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Xabarlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Mahsulot qo'shish
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Mahsulot nomi</Label>
                    <Input
                      placeholder="Masalan: Guruch"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>O'lchov birligi</Label>
                    <Select value={productUnit} onValueChange={setProductUnit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Miqdor</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={productQuantity}
                      onChange={(e) => setProductQuantity(e.target.value)}
                    />
                  </div>
                  <Button onClick={addProduct} className="w-full" disabled={loading}>
                    {loading ? "Qo'shilmoqda..." : "Mahsulot qo'shish"}
                  </Button>
                </CardContent>
              </Card>

              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Mahsulotlar zaxirasi</CardTitle>
                    <CardDescription>Mavjud mahsulotlar va ularning miqdori</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {stockLots.map((stock) => (
                        <Card key={stock.id} className="border">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold">{stock.product.name}</h3>
                              <Badge className={getStatusColor(stock.status)}>
                                {stock.status === "ok" ? "Yetarli" : stock.status === "warning" ? "Kam" : "Tugagan"}
                              </Badge>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                              {stock.quantity} {stock.product.unit}
                            </p>
                            <p className="text-sm text-gray-500">
                              Yangilangan: {new Date(stock.updated_at).toLocaleDateString()}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {usageReports.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Hozircha hisobotlar yo'q</p>
                  ) : (
                    usageReports.map((report) => (
                      <Card
                        key={report.id}
                        className={`border ${
                          report.is_overused
                            ? "border-red-200 bg-red-50"
                            : report.used_extra
                              ? "border-blue-200 bg-blue-50"
                              : "border-green-200 bg-green-50"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{report.product.name}</h3>
                              <p className="text-sm text-gray-600">Oshpaz: {report.cook_name}</p>
                              <p className="text-sm text-gray-500">
                                Sana: {new Date(report.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">
                                Ishlatildi:{" "}
                                <span className="font-semibold">
                                  {report.amount_used} {report.product.unit}
                                </span>
                              </p>
                              <p className="text-sm">
                                Kutilgan:{" "}
                                <span className="font-semibold">
                                  {report.expected_amount} {report.product.unit}
                                </span>
                              </p>
                              <div className="flex gap-1 mt-1">
                                {report.used_extra && <Badge className="bg-blue-100 text-blue-800">+15%</Badge>}
                                {report.is_overused && (
                                  <Badge className="bg-red-100 text-red-800">Ko'p ishlatilgan</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          {report.warning_message && (
                            <div
                              className={`mt-2 p-2 rounded text-sm ${
                                report.is_overused ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {report.warning_message}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Xabarlar</CardTitle>
                <CardDescription>Oshpazlardan kelgan xabarlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Hozircha xabarlar yo'q</p>
                  ) : (
                    messages.map((message) => (
                      <Card key={message.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{message.subject}</h3>
                              <p className="text-sm text-gray-600">Yuboruvchi: {message.sender}</p>
                              <p className="text-sm text-gray-500">{new Date(message.created_at).toLocaleString()}</p>
                            </div>
                            {!message.is_read && <Badge className="bg-blue-100 text-blue-800">Yangi</Badge>}
                          </div>
                          <p className="text-gray-700 mb-3">{message.content}</p>

                          {/* Javoblar */}
                          {message.replies.length > 0 && (
                            <div className="border-l-2 border-gray-200 pl-4 mb-3">
                              <h4 className="font-medium text-sm text-gray-600 mb-2">Javoblar:</h4>
                              {message.replies.map((reply) => (
                                <div key={reply.id} className="bg-gray-50 p-2 rounded mb-2">
                                  <p className="text-sm font-medium">{reply.sender}</p>
                                  <p className="text-sm text-gray-700">{reply.content}</p>
                                  <p className="text-xs text-gray-500">{new Date(reply.created_at).toLocaleString()}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Javob berish */}
                          {replyingTo === message.id ? (
                            <div className="space-y-2">
                              <Textarea
                                placeholder="Javobingizni yozing..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                              />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => replyToMessage(message.id)} disabled={loading}>
                                  {loading ? "Yuborilmoqda..." : "Javob yuborish"}
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setReplyingTo(null)}>
                                  Bekor qilish
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button size="sm" onClick={() => setReplyingTo(message.id)}>
                              Javob berish
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
