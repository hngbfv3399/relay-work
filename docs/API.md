# Relay Work API 계약 (프론트 연동용)

Base URL: `http://localhost:4000`  
인증(데모): `POST /auth/demo-users`로 사용자를 만든 뒤, 이후 요청에 반환된 `demoUserId`를 `x-demo-user-id` 헤더로 넣는다. 시드 사용자: `user_owner`, `user_minsu`, `user_sujin`.

모든 성공 응답은 `{ "data": ... }`이며, 목록은 `{ "data": [...], "meta": { "nextCursor", "hasNextPage" } }`이다. 오류는 `{ "error": { "code", "message" } }`이다.

## 화면별 API

| 화면/기능 | 메서드·경로 | 핵심 입력 |
| --- | --- | --- |
| 첫 사용자 등록 | `POST /auth/demo-users` | `{ "name": "지호" }` |
| 팀 선택 | `GET /teams` | - |
| 팀 홈 | `GET /teams/:teamId/home` | - |
| 팀 정보 | `GET`, `PATCH /teams/:teamId` | 이름, 설명 |
| 팀원 | `GET`, `POST /teams/:teamId/members` | `POST`: `userId` |
| 팀원 제외 | `DELETE /teams/:teamId/members/:memberId` | - |
| 카테고리 | `GET`, `POST /teams/:teamId/categories` | 이름, 순서 |
| 카테고리 수정/비활성화 | `PATCH`, `DELETE /teams/:teamId/categories/:categoryId` | 이름, 순서, 활성 여부 |
| 역할 | `GET`, `POST /teams/:teamId/roles` | 이름, 권한 목록 |
| 역할 수정/비활성화 | `PATCH`, `DELETE /teams/:teamId/roles/:roleId` | 이름, 권한, 활성 여부 |
| 역할 부여 | `PATCH /teams/:teamId/members/:memberId/roles` | `{ "roleIds": [] }` |
| 전달사항 목록/생성 | `GET`, `POST /teams/:teamId/items` | 아래 참조 |
| 전달사항 상세/수정/삭제 | `GET`, `PATCH`, `DELETE /items/:itemId` | `DELETE`는 204 |
| 완료 상태 | `PATCH /items/:itemId/completion` | `{ "completionStatus": "INCOMPLETE" \| "COMPLETE" }` |
| 읽음 | `POST /items/:itemId/read`, `GET /items/:itemId/reads` | - |

## 전달사항 생성·수정

`POST /teams/:teamId/items`에는 아래 필드를 보낸다. `PATCH /items/:itemId`는 원하는 필드만 보낸다.

```json
{
  "title": "재고 수량 확인",
  "content": "오늘 마감 전까지 확인해주세요.",
  "categoryId": "category_id",
  "isImportant": true,
  "audienceType": "SELECTED",
  "audiences": [{ "targetType": "MEMBER", "targetMemberId": "member_id" }],
  "requiresCompletion": true
}
```

- `audienceType`: `TEAM` 또는 `SELECTED`
- `SELECTED`는 최소 1개의 대상이 필요하며, 대상은 `MEMBER` + `targetMemberId` 또는 `ROLE` + `targetRoleId`이다.
- 완료 관리가 켜진 전달사항만 완료 상태를 바꿀 수 있다.
- 삭제 권한: 작성자, `ITEM_UPDATE_ANY` 권한 보유자, OWNER. 삭제 후 복구할 수 없다.

## 목록 검색 파라미터

`GET /teams/:teamId/items`는 다음을 조합해 사용할 수 있다.

| 파라미터 | 값 |
| --- | --- |
| `cursor`, `limit` | 커서, 1~50개 (기본 20) |
| `categoryId` | 카테고리 ID |
| `isImportant` | `true` / `false` |
| `unreadOnly` | `true` / `false` |
| `completionStatus` | `INCOMPLETE` / `COMPLETE` |
| `keyword` | 제목·본문 검색어 |
| `createdFrom`, `createdTo` | ISO 8601 일시 |

접근 권한이 없는 제한 전달사항은 목록·상세·읽음 API 모두에서 숨겨진다.
