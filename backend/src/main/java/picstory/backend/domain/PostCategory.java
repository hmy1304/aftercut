package picstory.backend.domain;

public enum PostCategory {
    ANIME("애니"),
    MOVIE("극장판");
    private final String label;
     PostCategory(String label) {
         this.label = label;
     }

     public String getLabel() {
         return label;
     }
}
