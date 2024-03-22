export const ThemeOne = () => {
    page.drawText(`Name: ${values.name}`, {
        x: 50,
        y: page.getHeight() - 100,
        size: 12,
        color: rgb(0, 0, 0),
      });
      page.drawText(`Email: ${values.email}`, {
        x: 50,
        y: page.getHeight() - 120,
        size: 12,
        color: rgb(0, 0, 0),
      });
}