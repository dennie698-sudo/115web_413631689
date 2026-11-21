# StudentHub Backend

依照課堂範例實作學生資料 API。

## 安裝與啟動

```bash
cd BackEndExample
npm install
```

將 `.env.example` 複製成 `.env`，並設定自己的 MongoDB 連線字串：

```env
MONGODB_URI=mongodb://127.0.0.1:27017/studenthub
PORT=8877
```

啟動開發伺服器：

```bash
npm run dev
```

## API

### 取得全部學生

- Method：GET
- URL：`http://localhost:8877/api/v1/user/findAll`

### 新增一位學生

- Method：POST
- URL：`http://localhost:8877/api/v1/user/insertOne`
- Body：選擇 raw / JSON

```json
{
  "userName": "tkuxx9999",
  "name": "測試學生",
  "department": "測試系",
  "grade": "一年級",
  "class": "A",
  "Email": "tkuxx9999@example.com"
}
```

userName 格式為 `tku + 科系縮寫 + 四位數座號`，座號不可重複。
