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
import { Checkbox } from "@/components/ui/checkbox"
import { ChefHat, Package, LogOut, ShoppingCart, MessageSquare, Plus, AlertCircle } from "lucide-react"

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

interface MealStandard {
  id: number
  name: string
  products: {
    product: Product
    amount_per_child: number
  }[]
}

interface MealOrder {
  id: number
  meal_type: {
    id: number
    name: string
  }
  children_count: number
  use_extra: boolean
  items: {
    product: Product
    needed_amount: number
    amount_with_extra: number
  }[]
  created_at: string
  status: "pending" | "taken"
}

interface Message {
  id: number
  sender: string
  receiver: string
  message_type: string
  message_type_display: string
  subject: string
  content: string
  is_read: boolean
  is_urgent: boolean
  created_at: string
  replies: Array<{
    id: number
    sender: string
    content: string
    created_at: string
    is_read: boolean
  }>
}

interface CookDashboardProps {
  user: User
  onLogout: () => void
}

export default function CookDashboard({ user, onLogout }: CookDashboardProps) {
  const [stockLots, setStockLots] = useState<StockLot[]>([])
  const [mealStandards, setMealStandards] = useState<MealStandard[]>([])
  const [mealOrders, setMealOrders] = useState<MealOrder[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  // Ovqat buyurtmasi
  const [selectedMeal, setSelectedMeal] = useState<string>("")
  const [childrenCount, setChildrenCount] = useState<string>("")
  const [useExtra, setUseExtra] = useState(false)

  // Yangi ovqat turi
  const [mealName, setMealName] = useState("")
  const [mealProducts, setMealProducts] = useState<Array<{ product_id: string; amount_per_child: string }>>([
    { product_id: "", amount_per_child: "" },
  ])

  // Xabar yuborish
  const [messageType, setMessageType] = useState("general")
  const [messageSubject, setMessageSubject] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [isUrgent, setIsUrgent] = useState(false)

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
      const [productsRes, mealTypesRes, mealRequestsRes, messagesRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/api/products/products/", {
          headers: getAuthHeaders(),
        }),
        fetch("http://127.0.0.1:8000/api/meals/meal-types/", {
          headers: getAuthHeaders(),
        }),
        fetch("http://127.0.0.1:8000/api/meals/meal-requests/", {
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

      if (mealTypesRes.ok) {
        const mealTypesData = await mealTypesRes.json()
        setMealStandards(mealTypesData)
      }

      if (mealRequestsRes.ok) {
        const mealRequestsData = await mealRequestsRes.json()
        setMealOrders(mealRequestsData)
      }

      if (messagesRes.ok) {
        const messagesData = await messagesRes.json()
        setMessages(messagesData)
      }
    } catch (error) {
      console.error("Data fetch error:", error)
    }
  }

  const createMealOrder = async () => {
    if (!selectedMeal || !childrenCount || Number.parseInt(childrenCount) <= 0) {
      alert("Iltimos, ovqat turini tanlang va bolalar sonini kiriting!")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/meals/meal-requests/create/", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          meal_type_id: selectedMeal,
          children_count: Number.parseInt(childrenCount),
          use_extra: useExtra,
        }),
      })

      if (response.ok) {
        setSelectedMeal("")
        setChildrenCount("")
        setUseExtra(false)
        fetchData()
        alert("Buyurtma muvaffaqiyatli yaratildi!")
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Buyurtma yaratishda xatolik")
      }
    } catch (error) {
      alert("Server bilan bog'lanishda xatolik")
    } finally {
      setLoading(false)
    }
  }

  const createMealType = async () => {
    if (!mealName.trim()) {
      alert("Ovqat nomini kiriting!")
      return
    }

    const validProducts = mealProducts.filter((p) => p.product_id && p.amount_per_child)
    if (validProducts.length === 0) {
      alert("Kamida bitta mahsulot qo'shing!")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/meals/meal-types/create/", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          name: mealName,
          products: validProducts,
        }),
      })

      if (response.ok) {
        setMealName("")
        setMealProducts([{ product_id: "", amount_per_child: "" }])
        fetchData()
        alert("Ovqat turi muvaffaqiyatli yaratildi!")
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Ovqat turi yaratishda xatolik")
      }
    } catch (error) {
      alert("Server bilan bog'lanishda xatolik")
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!messageSubject.trim() || !messageContent.trim()) {
      alert("Mavzu va xabar matnini kiriting!")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/messages/messages/create/", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          message_type: messageType,
          subject: messageSubject,
          content: messageContent,
          is_urgent: isUrgent,
        }),
      })

      if (response.ok) {
        setMessageType("general")
        setMessageSubject("")
        setMessageContent("")
        setIsUrgent(false)
        fetchData()
        alert("Xabar yuborildi!")
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Xabar yuborishda xatolik")
      }
    } catch (error) {
      alert("Server bilan bog'lanishda xatolik")
    } finally {
      setLoading(false)
    }
  }

  const takeProducts = async (orderId: number) => {
    setLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/meals/take-products/", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          meal_request_id: orderId,
        }),
      })

      if (response.ok) {
        fetchData()
        alert("Mahsulotlar muvaffaqiyatli olindi!")
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Mahsulot olishda xatolik")
      }
    } catch (error) {
      alert("Server bilan bog'lanishda xatolik")
    } finally {
      setLoading(false)
    }
  }

  const addMealProduct = () => {
    setMealProducts([...mealProducts, { product_id: "", amount_per_child: "" }])
  }

  const updateMealProduct = (index: number, field: string, value: string) => {
    const updated = [...mealProducts]
    updated[index] = { ...updated[index], [field]: value }
    setMealProducts(updated)
  }

  const removeMealProduct = (index: number) => {
    if (mealProducts.length > 1) {
      setMealProducts(mealProducts.filter((_, i) => i !== index))
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

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case "request":
        return "bg-blue-100 text-blue-800"
      case "suggestion":
        return "bg-green-100 text-green-800"
      case "complaint":
        return "bg-red-100 text-red-800"
      case "question":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const selectedMealData = mealStandards.find((m) => m.id.toString() === selectedMeal)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Oshpaz Paneli</h1>
            <p className="text-gray-600">{user.full_name}</p>
          </div>
          <Button variant="outline" onClick={onLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Chiqish
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ChefHat className="h-4 w-4" />
              Buyurtmalar
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ovqat qo'shish
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Mahsulotlar
            </TabsTrigger>
            <TabsTrigger value="take" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Mahsulot olish
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Xabarlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Yangi buyurtma yaratish</CardTitle>
                  <CardDescription>Ovqat turini tanlang va bolalar sonini kiriting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Ovqat turi</Label>
                    <Select value={selectedMeal} onValueChange={setSelectedMeal}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ovqat turini tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        {mealStandards.map((meal) => (
                          <SelectItem key={meal.id} value={meal.id.toString()}>
                            {meal.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="children-count">Bolalar soni</Label>
                    <Input
                      id="children-count"
                      type="number"
                      placeholder="Bolalar sonini kiriting"
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(e.target.value)}
                      min="1"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="use-extra"
                      checked={useExtra}
                      onCheckedChange={(checked) => setUseExtra(checked as boolean)}
                    />
                    <Label htmlFor="use-extra" className="text-sm">
                      15% qo'shimcha mahsulot olish
                    </Label>
                  </div>

                  {selectedMealData && childrenCount && Number.parseInt(childrenCount) > 0 && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold mb-2">Kerakli mahsulotlar:</h4>
                      {selectedMealData.products.map((p) => {
                        const baseAmount = p.amount_per_child * Number.parseInt(childrenCount)
                        const finalAmount = useExtra ? baseAmount * 1.15 : baseAmount
                        return (
                          <div key={p.product.id} className="flex justify-between text-sm">
                            <span>{p.product.name}:</span>
                            <span className="font-medium">
                              {finalAmount.toFixed(2)} {p.product.unit}
                              {useExtra && <span className="text-green-600 ml-1">(+15%)</span>}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <Button onClick={createMealOrder} className="w-full" disabled={loading}>
                    {loading ? "Yaratilmoqda..." : "Buyurtma yaratish"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Buyurtmalar tarixi</CardTitle>
                  <CardDescription>Yaratilgan buyurtmalar</CardDescription>
                </CardHeader>
                <CardContent>
                  {mealOrders.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Hozircha buyurtmalar yo'q</p>
                  ) : (
                    <div className="space-y-3">
                      {mealOrders.map((order) => (
                        <Card key={order.id} className="border">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{order.meal_type.name}</h4>
                              <div className="flex gap-2">
                                {order.use_extra && <Badge className="bg-blue-100 text-blue-800">+15%</Badge>}
                                <Badge
                                  className={
                                    order.status === "taken"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }
                                >
                                  {order.status === "taken" ? "Olindi" : "Kutilmoqda"}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{order.children_count} ta bola</p>
                            <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="meals">
            <Card>
              <CardHeader>
                <CardTitle>Yangi ovqat turi qo'shish</CardTitle>
                <CardDescription>Ovqat nomini va kerakli mahsulotlarni kiriting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Ovqat nomi</Label>
                  <Input placeholder="Masalan: Palov" value={mealName} onChange={(e) => setMealName(e.target.value)} />
                </div>

                <div className="space-y-4">
                  <Label>Mahsulotlar</Label>
                  {mealProducts.map((product, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Select
                          value={product.product_id}
                          onValueChange={(value) => updateMealProduct(index, "product_id", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Mahsulot tanlang" />
                          </SelectTrigger>
                          <SelectContent>
                            {stockLots.map((stock) => (
                              <SelectItem key={stock.product.id} value={stock.product.id.toString()}>
                                {stock.product.name} ({stock.product.unit})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-32">
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Miqdor"
                          value={product.amount_per_child}
                          onChange={(e) => updateMealProduct(index, "amount_per_child", e.target.value)}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeMealProduct(index)}
                        disabled={mealProducts.length === 1}
                      >
                        O'chirish
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addMealProduct}>
                    Mahsulot qo'shish
                  </Button>
                </div>

                <Button onClick={createMealType} className="w-full" disabled={loading}>
                  {loading ? "Yaratilmoqda..." : "Ovqat turi yaratish"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Mahsulotlar zaxirasi</CardTitle>
                <CardDescription>Mavjud mahsulotlar va ularning miqdori</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          </TabsContent>

          <TabsContent value="take">
            <Card>
              <CardHeader>
                <CardTitle>Mahsulot olish</CardTitle>
                <CardDescription>Buyurtmalar bo'yicha mahsulot oling</CardDescription>
              </CardHeader>
              <CardContent>
                {mealOrders.filter((o) => o.status === "pending").length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Olish uchun buyurtmalar yo'q</p>
                ) : (
                  <div className="space-y-4">
                    {mealOrders
                      .filter((o) => o.status === "pending")
                      .map((order) => (
                        <Card key={order.id} className="border">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="font-semibold flex items-center gap-2">
                                  {order.meal_type.name}
                                  {order.use_extra && <Badge className="bg-blue-100 text-blue-800">+15%</Badge>}
                                </h3>
                                <p className="text-sm text-gray-600">{order.children_count} ta bola uchun</p>
                              </div>
                              <Button
                                onClick={() => takeProducts(order.id)}
                                className="bg-green-600 hover:bg-green-700"
                                disabled={loading}
                              >
                                {loading ? "Olinmoqda..." : "Mahsulotlarni olish"}
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-medium">Kerakli mahsulotlar:</h4>
                              {order.items.map((item) => (
                                <div
                                  key={item.product.id}
                                  className="flex justify-between text-sm bg-gray-50 p-2 rounded"
                                >
                                  <span>{item.product.name}:</span>
                                  <span className="font-medium">
                                    {item.amount_with_extra.toFixed(2)} {item.product.unit}
                                    {order.use_extra && item.amount_with_extra > item.needed_amount && (
                                      <span className="text-green-600 ml-1">
                                        (+{(item.amount_with_extra - item.needed_amount).toFixed(2)})
                                      </span>
                                    )}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Adminga xabar yuborish</CardTitle>
                  <CardDescription>Talab, taklif yoki savollaringizni yuboring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Xabar turi</Label>
                    <Select value={messageType} onValueChange={setMessageType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Umumiy xabar</SelectItem>
                        <SelectItem value="request">Talab</SelectItem>
                        <SelectItem value="suggestion">Taklif</SelectItem>
                        <SelectItem value="complaint">Shikoyat</SelectItem>
                        <SelectItem value="question">Savol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Mavzu</Label>
                    <Input
                      placeholder="Xabar mavzusi"
                      value={messageSubject}
                      onChange={(e) => setMessageSubject(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Xabar</Label>
                    <Textarea
                      placeholder="Xabar matnini yozing..."
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="urgent"
                      checked={isUrgent}
                      onCheckedChange={(checked) => setIsUrgent(checked as boolean)}
                    />
                    <Label htmlFor="urgent" className="text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      Shoshilinch xabar
                    </Label>
                  </div>

                  <Button onClick={sendMessage} className="w-full" disabled={loading}>
                    {loading ? "Yuborilmoqda..." : "Xabar yuborish"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Yuborilgan xabarlar</CardTitle>
                  <CardDescription>Siz yuborgan xabarlar va javoblar</CardDescription>
                </CardHeader>
                <CardContent>
                  {messages.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Hozircha xabarlar yo'q</p>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((message) => (
                        <Card key={message.id} className="border">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{message.subject}</h4>
                              <div className="flex gap-1">
                                <Badge className={getMessageTypeColor(message.message_type)}>
                                  {message.message_type_display}
                                </Badge>
                                {message.is_urgent && (
                                  <Badge className="bg-red-100 text-red-800">
                                    <AlertCircle className="h-3 w-3 mr-1" />
                                    Shoshilinch
                                  </Badge>
                                )}
                                {!message.is_read && <Badge className="bg-blue-100 text-blue-800">Yangi</Badge>}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{message.content}</p>
                            <p className="text-xs text-gray-500">{new Date(message.created_at).toLocaleString()}</p>

                            {message.replies.length > 0 && (
                              <div className="mt-3 border-l-2 border-gray-200 pl-3">
                                <h5 className="font-medium text-sm text-gray-600 mb-2">Javoblar:</h5>
                                {message.replies.map((reply) => (
                                  <div key={reply.id} className="bg-gray-50 p-2 rounded mb-2">
                                    <p className="text-sm font-medium">{reply.sender}</p>
                                    <p className="text-sm text-gray-700">{reply.content}</p>
                                    <p className="text-xs text-gray-500">
                                      {new Date(reply.created_at).toLocaleString()}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
