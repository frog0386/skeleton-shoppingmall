## 프로젝트 파일/폴더

- src/routes에 페이지 파일이 들어감. 파일 경로로 URL 접속 가능
- src/lib 하위에 컴포넌트 또는 유틸 함수
- lib/util.js 파일 업로드 및 업로드한 URL 가져오는 유틸 함수. 필요한 함수 추가 가능
- .env에 supabase와 SNS 키값 포함
- \_\_layout.svelte에 모든 페이지 공통 요소 넣기
- app.html에 title, favicon 등 설정
- app.css 테일윈드 포함, 그 외에 커스텀 스타일 정의
- 그 외의 파일과 경로는 건드릴 일이 별로 없습니다

## 로그인/회원가입

- routes/sample 폴더에 구현되어 있습니다.
