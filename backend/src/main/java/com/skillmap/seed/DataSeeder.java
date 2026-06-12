package com.skillmap.seed;

import com.skillmap.model.*;
import com.skillmap.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository users;
    private final RoadmapRepository roadmaps;
    private final ResourceRepository resources;
    private final QuizRepository quizzes;
    private final ProjectRepository projects;
    private final DocumentationRepository docs;
    private final SkillGuideRepository guides;
    private final PasswordEncoder encoder;

    public DataSeeder(UserRepository u, RoadmapRepository r, ResourceRepository rs,
                      QuizRepository q, ProjectRepository p, DocumentationRepository d,
                      SkillGuideRepository g, PasswordEncoder e) {
        this.users=u; this.roadmaps=r; this.resources=rs; this.quizzes=q;
        this.projects=p; this.docs=d; this.guides=g; this.encoder=e;
    }

    @Override public void run(String... args) {
        seedAdmin(); seedRoadmaps(); seedQuizzes(); seedProjects(); seedDocs(); seedGuides();
    }

    private void seedAdmin() {
        if (users.existsByEmail("admin@skillmap.dev")) return;
        users.save(User.builder()
                .name("SkillMap Admin").email("admin@skillmap.dev")
                .password(encoder.encode("Admin@123"))
                .roles(new HashSet<>(Set.of("ROLE_ADMIN","ROLE_USER")))
                .build());
    }

    private void seedRoadmaps() {
        if (roadmaps.count() > 0) return;

        // Role-based
        String[][] roles = {
            {"frontend","Frontend","Build modern, interactive UIs.","Medium","8 weeks","Monitor"},
            {"backend","Backend","Design robust servers and APIs.","Medium","10 weeks","Server"},
            {"full-stack","Full Stack","End-to-end product engineer.","Hard","12 weeks","Layers"},
            {"devops","DevOps","CI/CD, containers, and cloud.","Hard","10 weeks","Settings"},
            {"devsecops","DevSecOps","Security-first delivery pipelines.","Hard","10 weeks","ShieldCheck"},
            {"data-analyst","Data Analyst","Turn data into decisions.","Medium","8 weeks","BarChart3"},
            {"ai-engineer","AI Engineer","Ship LLM-powered features.","Hard","12 weeks","Sparkles"},
            {"ai-data-scientist","AI & Data Scientist","ML + modern AI stack.","Hard","14 weeks","Brain"},
            {"data-engineer","Data Engineer","Pipelines and warehouses.","Hard","10 weeks","Database"},
            {"android","Android","Native Android with Kotlin.","Medium","10 weeks","Smartphone"},
            {"machine-learning","Machine Learning","Classical ML mastery.","Hard","12 weeks","Cpu"},
            {"ios","iOS","Swift + SwiftUI.","Medium","10 weeks","Apple"},
            {"blockchain","Blockchain","Smart contracts & dApps.","Hard","10 weeks","Link"},
            {"qa","QA","Testing & quality engineering.","Medium","6 weeks","CheckCircle"},
            {"software-architect","Software Architect","System design at scale.","Hard","12 weeks","Building"},
            {"cyber-security","Cyber Security","Offense + defense.","Hard","12 weeks","Shield"},
            {"ux-design","UX Design","Research → design → deliver.","Medium","8 weeks","Palette"},
            {"technical-writer","Technical Writer","Docs that developers love.","Easy","6 weeks","FileText"},
            {"game-developer","Game Developer","Unity/Unreal fundamentals.","Medium","10 weeks","Gamepad2"},
            {"mlops","MLOps","Serve & monitor ML in prod.","Hard","10 weeks","Workflow"},
            {"product-manager","Product Manager","Discovery → delivery.","Medium","8 weeks","Target"},
            {"engineering-manager","Engineering Manager","Lead high-performing teams.","Medium","8 weeks","Users"},
            {"developer-relations","Developer Relations","DevRel toolkit.","Easy","6 weeks","Megaphone"},
            {"bi-analyst","BI Analyst","Dashboards that drive action.","Medium","6 weeks","PieChart"},
        };
        for (String[] r : roles) roadmaps.save(makeRoadmap(r[0], r[1], r[2], "role", r[3], r[4], r[5]));

        // Skill-based
        String[][] skills = {
            {"java","Java","JVM, OOP, collections, concurrency.","Medium","8 weeks","Coffee"},
            {"spring-boot","Spring Boot","Opinionated production APIs.","Medium","8 weeks","Leaf"},
            {"react","React","Components, hooks, patterns.","Medium","6 weeks","Atom"},
            {"vue","Vue","Progressive framework.","Medium","6 weeks","Mountain"},
            {"angular","Angular","TS + RxJS batteries included.","Hard","8 weeks","Triangle"},
            {"javascript","JavaScript","The language of the web.","Easy","6 weeks","Code2"},
            {"typescript","TypeScript","Static types at scale.","Medium","4 weeks","Braces"},
            {"node-js","Node.js","Event-driven servers.","Medium","6 weeks","Hexagon"},
            {"python","Python","Readable, batteries-included.","Easy","6 weeks","Code"},
            {"system-design","System Design","Scale interview ready.","Hard","12 weeks","Network"},
            {"api-design","API Design","REST + gRPC + GraphQL.","Medium","4 weeks","Plug"},
            {"flutter","Flutter","Cross-platform mobile.","Medium","8 weeks","Smartphone"},
            {"cpp","C++","Systems programming.","Hard","10 weeks","Binary"},
            {"rust","Rust","Safe systems at speed.","Hard","10 weeks","Wrench"},
            {"go","Go","Concurrent, simple, fast.","Medium","6 weeks","Rocket"},
            {"graphql","GraphQL","Typed query language.","Medium","4 weeks","Share2"},
            {"mongodb","MongoDB","Document database.","Medium","4 weeks","Database"},
            {"linux","Linux","Shell + internals.","Medium","6 weeks","Terminal"},
            {"kubernetes","Kubernetes","Orchestrate containers.","Hard","8 weeks","Ship"},
            {"docker","Docker","Container fundamentals.","Medium","3 weeks","Box"},
            {"aws","AWS","Cloud foundations.","Hard","10 weeks","Cloud"},
            {"terraform","Terraform","IaC done right.","Medium","4 weeks","Map"},
            {"dsa","Data Structures & Algorithms","Interview-grade DSA.","Hard","12 weeks","GitBranch"},
            {"git-github","Git & GitHub","Version control mastery.","Easy","2 weeks","GitMerge"},
            {"nextjs","Next.js","React meta-framework.","Medium","4 weeks","ArrowRight"},
            {"prompt-engineering","Prompt Engineering","Craft LLM instructions.","Easy","3 weeks","MessageSquare"},
            {"sql","SQL","Query the world's data.","Easy","4 weeks","Table"},
            {"design-system","Design System","Tokens, components, docs.","Medium","6 weeks","LayoutGrid"},
        };
        for (String[] s : skills) roadmaps.save(makeRoadmap(s[0], s[1], s[2], "skill", s[3], s[4], s[5]));
    }

    private Roadmap makeRoadmap(String slug, String title, String desc, String category,
                                String level, String duration, String icon) {
        List<Phase> phases = new ArrayList<>();
        String[][] phaseDefs = defaultPhases(slug);
        for (int i = 0; i < phaseDefs.length; i++) {
            String[] pd = phaseDefs[i];
            Phase ph = Phase.builder().title(pd[0]).summary(pd[1]).order(i).build();
            for (int j = 2; j < pd.length; j++) {
                ph.getTopics().add(Topic.builder().title(pd[j]).order(j - 2)
                        .description("Learn " + pd[j] + " in the context of " + title + ".").build());
            }
            phases.add(ph);
        }
        return Roadmap.builder()
                .slug(slug).title(title).description(desc).category(category)
                .level(level).duration(duration).icon(icon).status("Published")
                .phases(phases).views((int) (Math.random() * 500)).build();
    }

    private String[][] defaultPhases(String slug) {
        return switch (slug) {
            case "java" -> new String[][] {
                {"Foundations","Language basics","Syntax & types","Control flow","OOP Basics","Collections"},
                {"Intermediate","Real-world Java","Generics","Streams & Lambdas","Exceptions","I/O & Files"},
                {"Advanced","Ship production code","Concurrency","JVM internals","Testing (JUnit)","Build tools (Maven/Gradle)"}
            };
            case "spring-boot" -> new String[][] {
                {"Foundations","Core building blocks","Spring IoC","Beans & Config","REST Controllers","Validation"},
                {"Data & Security","Persist & secure","Spring Data JPA","Spring Security + JWT","Exception Handling","Transactions"},
                {"Production","Operate at scale","Testing","Actuator & Metrics","Docker & Deploy","Messaging (Kafka)"}
            };
            case "frontend" -> new String[][] {
                {"Foundations","How the web works","HTML Semantics","CSS & Flex/Grid","JavaScript ES6+","DOM & Fetch API"},
                {"Modern Stack","Build dynamic UIs","React","State & Hooks","Routing","Testing (Vitest)"},
                {"Professional","Scale & polish","TypeScript","Next.js","Performance","Accessibility"}
            };
            case "backend" -> new String[][] {
                {"Foundations","Language & HTTP","Pick a language","HTTP & REST","Auth basics","Databases 101"},
                {"APIs & Data","Design robust APIs","REST Design","GraphQL","SQL & Postgres","NoSQL & Mongo"},
                {"Scale","Production-grade","Caching (Redis)","Queues","Observability","Deployment"}
            };
            case "full-stack" -> new String[][] {
                {"Foundation","Logic + UI","HTML/CSS","JavaScript","Git","Responsive Design"},
                {"Modern Stack","Ship apps","React","Node.js/Express","PostgreSQL","MongoDB"},
                {"Professional Grade","Scale & secure","TypeScript","Next.js","Docker","CI/CD"}
            };
            case "devops" -> new String[][] {
                {"Systems","Linux & networking","Linux CLI","Networking","Scripting (Bash)","Git"},
                {"Containers & IaC","Immutable infra","Docker","Kubernetes","Terraform","Ansible"},
                {"Cloud & SRE","Operate at scale","AWS/GCP","CI/CD","Monitoring","Incident Response"}
            };
            case "ai-engineer","ai-data-scientist","machine-learning" -> new String[][] {
                {"Foundations","Python + stats","Python","NumPy & Pandas","Statistics","Linear Algebra basics"},
                {"Machine Learning","Classical ML","Scikit-learn","Model Validation","Feature Engineering","Kaggle practice"},
                {"Deep Learning & GenAI","Neural nets & LLMs","PyTorch","Transformers","RAG & LangChain","Vector DBs"}
            };
            case "cyber-security" -> new String[][] {
                {"Tech Core","Networks & OS","Networking","Linux CLI","Windows internals","Python scripting"},
                {"Security Core","Red + Blue","OWASP Top 10","Nmap & Wireshark","SIEM basics","Firewalls"},
                {"Specialize","Pick a path","Pentesting","Threat Hunting","Cloud Security","GRC"}
            };
            case "system-design" -> new String[][] {
                {"Fundamentals","Building blocks","Scalability","Load balancers","Caching","Databases choice"},
                {"Patterns","Proven designs","Microservices","Message queues","CAP & Consistency","Sharding"},
                {"Case Studies","Real systems","Design Twitter","Design Netflix","Design Uber","Design WhatsApp"}
            };
            case "kubernetes" -> new String[][] {
                {"Basics","Pods & Deployments","Pods","Deployments","Services","ConfigMaps"},
                {"Ops","Run reliably","Probes","HPA","Ingress","RBAC"},
                {"Advanced","Production","Helm","Operators","Service Mesh","Observability"}
            };
            default -> new String[][] {
                {"Foundations","Get the basics right","Key concepts","Tooling","Hello-world project","Read the docs"},
                {"Intermediate","Build real things","Patterns","Testing","Ecosystem","Mid-level project"},
                {"Advanced","Go deep","Performance","Architecture","Production readiness","Capstone project"}
            };
        };
    }

    private void seedQuizzes() {
        if (quizzes.count() > 0) return;
        quizzes.save(quizFullStack());
        quizzes.save(quizDataAI());
        quizzes.save(quizDevOps());
        quizzes.save(quizSecurity());
        quizzes.save(quizJavaBasicsMCQ());
    }

    private Quiz quizFullStack() {
        return Quiz.builder()
                .title("2026 Interview Prep — Full-Stack & Systems").track("FullStack")
                .description("Six long-form questions covering Rust, React, microservices, SQL vs NoSQL, Docker/Java, CI/CD.")
                .difficulty("Hard")
                .questions(List.of(
                        shortQ(0,"Rust & Concurrency: How does Rust’s Ownership and Borrowing model eliminate common memory bugs (like null pointers) that are frequent in C++ or Java?",
                                "Ownership gives each value a single owner; when it goes out of scope it's dropped — eliminating leaks. Borrowing enforces compile-time rules: either many immutable refs OR one mutable ref, preventing data races. No null by default (Option<T>), no use-after-free, no double-free. The borrow checker proves memory safety at compile time with zero runtime cost.",
                                List.of("Ownership rules","Borrow checker (shared vs mutable)","No nulls — Option<T>","Compile-time vs runtime","Compared to C++/Java GC")),
                        shortQ(1,"React State Management: In a complex React + Spring Boot app, when should you favor the Context API over Redux, and how do you prevent unnecessary re-renders?",
                                "Use Context for low-frequency, app-wide values (theme, auth, locale). Prefer a dedicated store (Redux Toolkit / Zustand) for frequently changing, cross-cutting state. Prevent re-renders by splitting contexts, using selectors, memoizing providers, React.memo + useMemo/useCallback, and colocating state.",
                                List.of("Low vs high frequency state","Context splitting","Memoization (memo/useMemo/useCallback)","When Redux wins","Colocation")),
                        shortQ(2,"Microservices Communication: Explain trade-offs between REST and GraphQL in high-traffic microservices.",
                                "REST: simple, cacheable, HTTP-native, great for CRUD and CDN caching. Over/under-fetching and chatty clients are pain points. GraphQL: single endpoint, precise queries, strong typing — but harder caching, N+1 risk, and schema ownership is complex across teams. Use gRPC for internal high-throughput, REST for public, GraphQL for aggregation gateways.",
                                List.of("Caching & CDN","Over/under-fetching","N+1 problem","Schema governance","When to mix (REST+GraphQL+gRPC)")),
                        shortQ(3,"SQL vs. NoSQL: Real-time social feed — profile vs activity stream choice?",
                                "User profiles: structured, relational → PostgreSQL (joins, constraints, ACID). Activity stream: high write velocity, append-heavy, eventual consistency → NoSQL (Cassandra/DynamoDB) or a log (Kafka) + fan-out. Choose per workload, not per company.",
                                List.of("ACID vs BASE","Read vs write patterns","Schema evolution","Fan-out on write vs read","Polyglot persistence")),
                        shortQ(4,"Docker & Java: Optimize a Spring Boot image for size & security.",
                                "Use multi-stage build, JRE (not JDK) base image, jlink or Alpine/distroless. Run as non-root, drop capabilities, read-only FS. Layer the JAR (spring-boot layertools) for cache reuse. Scan with Trivy, pin digests, use .dockerignore.",
                                List.of("Multi-stage build","JRE / distroless","Non-root user","Layered JAR","Image scanning")),
                        shortQ(5,"CI/CD Maturity: Continuous Delivery vs Continuous Deployment + where security scans go.",
                                "Delivery: every change auto-built, tested, ready-to-release (manual approval). Deployment: automatic to prod on green build. Security scans: SAST on PR, dependency scan (SCA) on build, DAST on staging, image scan before registry push, secrets scan on commit — shift-left everywhere.",
                                List.of("Definition of CD vs Continuous Deployment","Shift-left security","SAST/SCA/DAST placement","Gates & approvals","Image scanning in pipeline"))
                )).build();
    }

    private Quiz quizDataAI() {
        return Quiz.builder().title("2026 Interview Prep — Data Science & AI").track("DataAI").difficulty("Hard")
                .description("Overfitting, backprop, transformers, Pandas optimization, Central Limit Theorem.")
                .questions(List.of(
                        shortQ(0,"Overfitting: Random Forest 99% train / 70% test — three specific fixes?",
                                "1) Limit tree depth / min_samples_leaf / prune. 2) Reduce n_features per split (max_features) and add more trees with bagging. 3) Add regularization via more data / cross-validation / early stopping / feature selection.",
                                List.of("max_depth / min_samples_leaf","max_features / bagging","CV & more data","Regularization","Feature selection")),
                        shortQ(1,"Deep Learning: How do Backpropagation and Gradient Descent update weights together?",
                                "Forward pass computes loss. Backprop applies chain rule to compute ∂L/∂w for every weight via the computation graph. Gradient descent (or Adam/SGD) updates w ← w − η·∂L/∂w. Repeat per mini-batch until convergence.",
                                List.of("Forward pass / loss","Chain rule","Gradient computation","Optimizer step","Mini-batches & epochs")),
                        shortQ(2,"NLP: Why do Transformers need Positional Encoding — vs RNN memory?",
                                "Self-attention is permutation-invariant — it sees a bag of tokens. Positional encoding injects order (sinusoidal or learned) so the model knows token positions. RNNs encode order implicitly via sequential hidden states but can't parallelize and struggle with long dependencies.",
                                List.of("Attention is permutation-invariant","Sinusoidal vs learned PE","Parallelization advantage","Long-range dependencies","Contrast with RNN hidden state")),
                        shortQ(3,"Pandas: Handle a 10GB CSV on an 8GB RAM machine.",
                                "Use chunksize with pd.read_csv and aggregate per chunk. Downcast dtypes (int32, category). Parse only needed columns (usecols). Consider Dask, Polars, or DuckDB for out-of-core. Store as Parquet for future reads.",
                                List.of("chunksize","dtype downcasting","usecols","Dask/Polars/DuckDB","Parquet")),
                        shortQ(4,"Statistics: Central Limit Theorem & business inference from small samples.",
                                "Sampling distribution of the mean → approximately Normal as n grows, regardless of population shape, given finite variance. Enables confidence intervals & hypothesis tests on means. Small samples → use t-distribution, check assumptions, avoid drawing causal claims.",
                                List.of("Sampling distribution","Normality of means","Finite variance assumption","t-distribution for small n","Confidence intervals"))
                )).build();
    }

    private Quiz quizDevOps() {
        return Quiz.builder().title("2026 Interview Prep — DevOps & Cloud").track("DevOps").difficulty("Hard")
                .description("K8s probes, Terraform drift, Ansible idempotency, IAM least-privilege.")
                .questions(List.of(
                        shortQ(0,"Kubernetes: Readiness vs Liveness probe?",
                                "Liveness: 'is the process healthy?' — failing it restarts the pod. Readiness: 'can it serve traffic right now?' — failing it removes pod from Service endpoints (no restart). Together they prevent routing to warming/broken pods while keeping stable ones alive.",
                                List.of("Liveness restarts pod","Readiness removes from endpoints","Warm-up scenarios","Probe types (httpGet/exec/tcp)","Startup probe mention")),
                        shortQ(1,"Terraform: Manage configuration drift when someone edits in the console.",
                                "Run terraform plan to detect drift; terraform apply to reconcile, or terraform import + refactor. Prevent drift: deny console writes via IAM, use SCPs/guardrails, automate apply via CI with state locking (S3+DynamoDB), require PRs for all changes, run drift detection on a schedule.",
                                List.of("plan / refresh detects drift","IAM deny manual changes","Remote state + locking","CI/CD as single source of truth","Scheduled drift checks")),
                        shortQ(2,"Ansible: How does idempotency prevent breakage on repeated runs?",
                                "Modules check current state and only change if different from desired — e.g., package: present installs only if missing. Use handlers, check mode, and avoid raw shell when possible. The playbook describes the end state, not imperative steps.",
                                List.of("Declarative vs imperative","Module-level state checks","Handlers","Check mode","Avoid raw shell")),
                        shortQ(3,"Cloud IAM: Least-privilege across AWS IAM and GCP Service Accounts.",
                                "AWS: JSON policies attached to users/roles/groups with resource/action/condition. GCP: service accounts bound to predefined or custom roles via IAM bindings. Enforce least privilege via scoped roles, permission boundaries (AWS), Org Policies (GCP), access analyzer, short-lived credentials (STS/WIF), and periodic access reviews.",
                                List.of("AWS policy doc structure","GCP role bindings","Boundaries / Org policies","Short-lived creds (STS/WIF)","Access reviews & analyzer"))
                )).build();
    }

    private Quiz quizSecurity() {
        return Quiz.builder().title("2026 Interview Prep — Cybersecurity & Strategy").track("Security").difficulty("Hard")
                .description("Pen-test phases, SIEM + GDPR, RICE prioritization, IDS vs IPS.")
                .questions(List.of(
                        shortQ(0,"Ethical Hacking: Five phases of a penetration test.",
                                "1) Reconnaissance (passive & active). 2) Scanning (Nmap, vuln scanners). 3) Gaining Access (exploit). 4) Maintaining Access (persistence). 5) Covering Tracks / Reporting. In real engagements the 5th phase is replaced with responsible clean-up + reporting.",
                                List.of("Recon passive vs active","Scanning tools","Exploitation","Persistence","Reporting / clean-up")),
                        shortQ(1,"SIEM + Compliance: Detecting insider threats & GDPR/HIPAA retention.",
                                "SIEM aggregates logs, correlates rules/UEBA to flag anomalies (off-hours access, mass downloads, privilege escalations). GDPR/HIPAA drive retention min/max — keep security logs long enough for investigations but purge PII when lawful basis ends; data minimization + audit trails are mandatory.",
                                List.of("SIEM correlation & UEBA","Insider anomaly examples","Data minimization","Retention vs purge","Audit trails")),
                        shortQ(2,"Prioritization: Apply RICE to security patch vs new AI feature.",
                                "Score each by Reach × Impact × Confidence ÷ Effort. A critical CVE often has high Impact & Confidence with low Effort → high RICE. Adjust with risk-adjusted frameworks (CVSS/EPSS) for security. New AI feature may have high Reach but lower Confidence. Prioritize patch if exploit is known.",
                                List.of("RICE formula","CVSS/EPSS for risk","Exploit availability","Effort sizing","Outcome: patch first")),
                        shortQ(3,"Network Defense: IDS vs IPS — edge vs internal placement.",
                                "IDS detects & alerts (passive). IPS blocks inline (active). Place IPS at the edge to stop known bad traffic, and IDS deeper in segments for visibility without performance risk. Tune rules to avoid false positives breaking prod.",
                                List.of("IDS passive / IPS inline","Edge vs internal trade-offs","False positive impact","NSM visibility","Tuning & baselines"))
                )).build();
    }

    private Quiz quizJavaBasicsMCQ() {
        return Quiz.builder().title("Java Basics — MCQ").track("FullStack").difficulty("Easy")
                .description("Quick multiple-choice check of Java fundamentals.")
                .questions(List.of(
                        mcq(0,"Which keyword is used to prevent inheritance of a class?",
                                List.of("static","final","abstract","sealed"), 1),
                        mcq(1,"Which collection preserves insertion order and allows duplicates?",
                                List.of("HashSet","TreeSet","ArrayList","HashMap"), 2),
                        mcq(2,"What does the 'volatile' keyword guarantee?",
                                List.of("Atomicity","Visibility across threads","Both atomicity and visibility","None"), 1),
                        mcq(3,"Stream.collect(Collectors.toList()) returns a list that is…",
                                List.of("Immutable always","Mutable (ArrayList)","Synchronized","Lazy"), 1)
                )).build();
    }

    private Question shortQ(int order, String stem, String model, List<String> rubric) {
        return Question.builder()
                .type("SHORT_ANSWER").stem(stem).modelAnswer(model)
                .rubric(new ArrayList<>(rubric)).difficulty("Hard").order(order).build();
    }
    private Question mcq(int order, String stem, List<String> options, int correct) {
        return Question.builder()
                .type("MCQ").stem(stem).options(new ArrayList<>(options))
                .correctIndex(correct).difficulty("Easy").order(order).build();
    }

    private void seedProjects() {
        if (projects.count() > 0) return;
        projects.save(proj("Weather / To-do App","Beginner","Learn API calls + local state.",
                List.of("React","Fetch API","localStorage"),
                List.of("Fetch weather by city","Add/complete todos","Persist to localStorage"),"FullStack"));
        projects.save(proj("E-Commerce Full-Stack","Intermediate","End-to-end shop with auth + payments.",
                List.of("React","Spring Boot","PostgreSQL","Stripe"),
                List.of("JWT auth","Product catalog","Cart & checkout","Stripe payments","Admin dashboard"),"FullStack"));
        projects.save(proj("Agentic AI Workflow","Advanced","Build a tool-using AI agent.",
                List.of("Python","LangChain","OpenAI","Vector DB"),
                List.of("RAG pipeline","Multi-step tool use","Eval suite","Deploy API"),"DataAI"));
        projects.save(proj("Phishing Detector","Specialized","Classify emails with ML.",
                List.of("Python","Scikit-learn","NLP"),
                List.of("Dataset prep","Feature engineering","Baseline + tuned model","Report F1/ROC"),"Security"));
        projects.save(proj("Task Management App","Intermediate","Drag-and-drop kanban with auth.",
                List.of("React","dnd-kit","Node","MongoDB"),
                List.of("Auth","Board + columns","Drag-and-drop","Realtime updates"),"FullStack"));
        projects.save(proj("Home Cyber Lab","Intermediate","Hack a vulnerable VM.",
                List.of("VirtualBox","Kali Linux","Metasploitable","Nmap"),
                List.of("Lab setup","Recon + scan","Exploit","Write-up"),"Security"));
        projects.save(proj("Customer Churn Predictor","Intermediate","Predict churn with classical ML.",
                List.of("Python","Pandas","Scikit-learn"),
                List.of("EDA","Feature engineering","Model compare","Dashboard"),"DataAI"));
    }

    private Project proj(String t, String lv, String d, List<String> stack, List<String> ms, String track) {
        return Project.builder().title(t).level(lv).description(d)
                .stack(new ArrayList<>(stack)).milestones(new ArrayList<>(ms)).track(track).build();
    }

    private void seedDocs() {
        if (docs.count() > 0) return;
        String[][] ds = {
            {"Java","Java Official Docs","https://docs.oracle.com/en/java/","Official"},
            {"Java","Baeldung","https://www.baeldung.com/","Community"},
            {"Spring Boot","Spring Boot Reference","https://docs.spring.io/spring-boot/docs/current/reference/html/","Official"},
            {"Python","Python Official Docs","https://docs.python.org/","Official"},
            {"JavaScript","MDN Web Docs","https://developer.mozilla.org/","Official"},
            {"React","React.dev","https://react.dev/","Official"},
            {"Node.js","Node.js Documentation","https://nodejs.org/en/docs","Official"},
            {"Docker","Docker Documentation","https://docs.docker.com/","Official"},
            {"Kubernetes","Kubernetes Documentation","https://kubernetes.io/docs/","Official"},
            {"AWS","AWS Developer Center","https://aws.amazon.com/developer/","Official"},
            {"PyTorch","PyTorch Docs","https://pytorch.org/docs/stable/index.html","Official"},
            {"Pandas","Pandas User Guide","https://pandas.pydata.org/docs/user_guide/","Official"},
            {"Scikit-learn","Scikit-learn User Guide","https://scikit-learn.org/stable/user_guide.html","Official"},
            {"OWASP","OWASP Top 10","https://owasp.org/www-project-top-ten/","Official"},
            {"Nmap","Nmap Reference","https://nmap.org/book/man.html","Official"},
            {"Terraform","Terraform Docs","https://developer.hashicorp.com/terraform/docs","Official"},
        };
        for (String[] d : ds) docs.save(Documentation.builder().tech(d[0]).title(d[1]).url(d[2]).kind(d[3]).build());
    }

    private void seedGuides() {
        if (guides.count() > 0) return;
        guides.save(makeGuide("The Builder — Full-Stack Software Engineering","Builder","9–12 Months",
                "Build scalable applications from scratch.",
                new String[][] {
                        {"Foundation (Months 1–3)","HTML/CSS, JavaScript ES6+, Git","Semantic HTML","Flex & Grid","ES6+","Git basics"},
                        {"Modern Stack (Months 4–6)","React + Node + DBs","React","Node + Express","PostgreSQL","MongoDB"},
                        {"Professional (Months 7–9)","Next.js + TS + DevOps","Next.js","TypeScript","Docker","CI/CD"}
                }));
        guides.save(makeGuide("The Oracle — Data Science & AI","Oracle","12–15 Months",
                "Extract insights and build intelligent agents.",
                new String[][] {
                        {"Data Literacy (M1–3)","Python + stats","Python","Statistics","NumPy","Pandas"},
                        {"Machine Learning (M4–8)","Classical ML","Scikit-learn","Model validation","Kaggle practice","Feature engineering"},
                        {"AI Frontier (M9–15)","DL + GenAI","PyTorch","Transformers","RAG + LangChain","Vector DBs"}
                }));
        guides.save(makeGuide("The Sentinel — Cybersecurity","Sentinel","10–12 Months",
                "Protect systems and exploit vulnerabilities.",
                new String[][] {
                        {"Systems & Networks (M1–3)","OS + net","Networking","Linux CLI","Python scripting","Bash"},
                        {"Security Core (M4–7)","Red + Blue","OWASP Top 10","Nmap","Burp Suite","SIEM"},
                        {"Specialization (M8–12)","Pick path","Pentesting","Threat hunting","Cloud security","Digital forensics"}
                }));
    }

    private SkillGuide makeGuide(String title, String track, String timeline, String summary, String[][] phaseDefs) {
        List<Phase> phs = new ArrayList<>();
        for (int i = 0; i < phaseDefs.length; i++) {
            String[] pd = phaseDefs[i];
            Phase p = Phase.builder().title(pd[0]).summary(pd[1]).order(i).build();
            for (int j = 2; j < pd.length; j++) p.getTopics().add(Topic.builder().title(pd[j]).order(j-2).build());
            phs.add(p);
        }
        return SkillGuide.builder().title(title).track(track).timeline(timeline).summary(summary).phases(phs).goal(summary).build();
    }
}
