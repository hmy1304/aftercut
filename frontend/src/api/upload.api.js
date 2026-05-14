import client from './client'

/**
 * 이미지를 S3에 업로드하고 Public URL을 반환한다.
 * @param {File} file   - input[type=file]에서 얻은 File 객체
 * @param {string} dir  - S3 저장 디렉토리 (기본값: 'images')
 * @returns {Promise<string>} 업로드된 파일의 S3 Public URL
 */
export const uploadImage = async (file, dir = 'images') => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('dir', dir)

  const response = await client.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response.data.url
}

/**
 * S3에서 파일을 삭제한다.
 * @param {string} url - 삭제할 파일의 S3 Public URL
 */
export const deleteImage = async (url) => {
  await client.delete('/upload', { data: { url } })
}